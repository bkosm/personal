/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { TextLineStream } from "https://deno.land/std@0.150.0/streams/delimiter.ts";
import {
  afterAll,
  beforeAll,
} from "https://deno.land/std@0.148.0/testing/bdd.ts";
import { Page } from "https://deno.land/x/puppeteer@14.1.1/mod.ts";

type TestBody = (t: Deno.TestContext) => Promise<void>;

export { describe, it } from "https://deno.land/std@0.148.0/testing/bdd.ts";
export {
  assert,
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.150.0/testing/asserts.ts";
export { delay } from "https://deno.land/std@0.150.0/async/delay.ts";
import { assertSnapshot } from "https://deno.land/std@0.151.0/testing/snapshot.ts";
export { assertSnapshot };

export function intTest(name: string, fn: TestBody) {
  return Deno.test({
    name,
    async fn(t) {
      const serverProcess = Deno.run({
        cmd: ["deno", "run", "-A", "./main.ts"],
        stdout: "piped",
        stderr: "inherit",
      });

      beforeAll(async () => {
        const lines = serverProcess.stdout.readable
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(new TextLineStream());

        let started = false;
        for await (const line of lines) {
          if (line.includes("Listening on http://")) {
            started = true;
            break;
          }
        }
        if (!started) {
          throw new Error("Server didn't start up");
        }
      });

      afterAll(async () => {
        await serverProcess.close();
      });

      await fn(t);
    },
    sanitizeOps: false,
    sanitizeResources: false,
  });
}

export async function assertTitle(t: Deno.TestContext, page: Page) {
  const elem = await page.waitForSelector("head > title");
  const text = await elem?.evaluate((el) => el.textContent);

  assertSnapshot(t, text);
}
