import { assertTitle, intTest } from "./deps.ts";
import { assertVisualSnapshot } from "./regression.ts";
import { assertSnapshot } from "https://deno.land/std@0.151.0/testing/snapshot.ts";
import { delay } from "https://deno.land/std@0.150.0/async/delay.ts";

intTest("webdriver tests", async (t, b) => {
  const p = await b.newPage();
  p.setViewport({ width: 1920, height: 1080 });

  // deno-lint-ignore no-explicit-any
  const open = async (page: any, path: any) =>
    await page.goto(`http://localhost:8000${path}`, {
      waitUntil: "networkidle2",
    });

  // Index page
  await open(p, "/");

  await t.step("index page - has proper title", async () => {
    await assertTitle(t, p);
  });

  await t.step("index page - visual requirements are met", async () => {
    await assertVisualSnapshot(p, "index1");
  });

  // Post page
  await open(p, "/posts/test-page");

  await t.step("post page - visual requirements are met", async () => {
    await delay(100);
    await assertVisualSnapshot(p, "posts1");
  });

  // Invalid page
  await open(p, "/posts/whoops-not-gonna-happen");

  await t.step("invalid post page - redirects home", () => {
    assertSnapshot(t, p.url());
  });
});
