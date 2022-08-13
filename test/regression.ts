import { dirname, fromFileUrl } from "https://deno.land/std@0.57.0/path/mod.ts";
import { decode, encode } from "https://deno.land/x/pngs@0.1.1/mod.ts";
import { diff } from "https://cdn.skypack.dev/-/pixel-buffer-diff@v1.3.2-y6RmJylRfpwHIB6SMZMr/dist=es2019,mode=imports/optimized/pixel-buffer-diff.js";
import { AssertionError } from "https://deno.land/std@0.150.0/testing/asserts.ts";
import { Page } from "https://deno.land/x/puppeteer@14.1.1/mod.ts";

type ImageData = { image: Uint8Array; width: number; height: number };
type RegressionResult =
  | { type: "success" }
  | { type: "regression-failure"; diffImage: ImageData }
  | { type: "image-failure" };

const fileExists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
};

function performVisualRegression(
  baselineImagePath: string,
  candidateImagePath: string,
  significanceThreshold = 0.3,
  cumulatedDiffThreshold = 2200,
): RegressionResult {
  const pngBaseline = decode(Deno.readFileSync(baselineImagePath));
  const pngCandidate = decode(Deno.readFileSync(candidateImagePath));

  const { width, height } = pngBaseline;

  if (width !== pngCandidate.width || height !== pngCandidate.height) {
    return { type: "image-failure" };
  }

  const diffImageData: ImageData = {
    width: 3 * width,
    height,
    image: new Uint8Array(3 * width * height * 4),
  };

  // Diff images with 1% threshold and minimap overlay to spot isolated changes
  const result = diff(
    pngBaseline.image,
    pngCandidate.image,
    diffImageData.image,
    width,
    height,
    {
      threshold: significanceThreshold,
      enableMinimap: true,
    },
  );

  // Save the diff if the cumulated delta is significant
  if (result.cumulatedDiff > cumulatedDiffThreshold) {
    console.log({ name: "visual-regression-result", result });
    return { type: "regression-failure", diffImage: diffImageData };
  } else {
    return { type: "success" };
  }
}

export const SNAPSHOT_DIR = `${
  dirname(
    fromFileUrl(import.meta.url),
  )
}/snapshots`;

export async function assertVisualSnapshot(page: Page, id: string) {
  const approvedPath = `${SNAPSHOT_DIR}/approved.${id}.png`;
  const candidatePath = `${SNAPSHOT_DIR}/actual.${id}.png`;
  const diffPath = `${SNAPSHOT_DIR}/diff.${id}.png`;

  if (await fileExists(approvedPath)) {
    await page.screenshot({
      fullPage: true,
      path: candidatePath,
      captureBeyondViewport: false,
    });

    const result = performVisualRegression(approvedPath, candidatePath);
    switch (result.type) {
      case "success": {
        Deno.removeSync(candidatePath);
        break;
      }
      case "regression-failure": {
        // this currently happens only if the dimensions match exactly
        const { image, width, height } = result.diffImage;
        Deno.writeFileSync(diffPath, encode(image, width, height));
        throw new AssertionError(
          "Visual regression failed, diff image was created",
        );
      }
      case "image-failure": {
        throw new AssertionError(
          "Visual regression failed, the image dimensions are now different",
        );
      }
    }
  } else {
    await page.screenshot({
      fullPage: true,
      path: candidatePath,
      captureBeyondViewport: false,
    });
    throw new AssertionError(
      `Created actual snapshot for ${id}, approve it manually by changing prefix to 'approved.'`,
    );
  }
}
