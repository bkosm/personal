import { assertTitle, intTest, name, scrollDown } from "./deps.ts";
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

  // deno-lint-ignore no-explicit-any
  const clickByText = async (page: any, text: string) => {
    const linkHandlers = await page.$x(`//div[contains(text(), '${text}')]`);

    if (linkHandlers.length > 0) {
      await linkHandlers[0].click();
    } else {
      throw new Error(`Link not found: ${text}`);
    }
  };

  // Index page
  await t.step("index page - has proper title", async () => {
    await open(p, "/");
    await assertTitle(t, p);
  });

  await t.step("index page - visual requirements are met", async () => {
    await assertVisualSnapshot(p, "index1");
  });

  // Post page
  await t.step("post page - index page links redirect to posts", async () => {
    await clickByText(p, "Test page used for automated testing");
    await delay(100);
    await assertTitle(t, p);
    assertSnapshot(t, p.url(), name("post url"));
  });

  await t.step("post page - visual requirements are met", async () => {
    await delay(600);
    await assertVisualSnapshot(p, "posts1");
    await scrollDown(p);
    await assertVisualSnapshot(p, "posts2");
  });

  // Invalid page
  await t.step("invalid post page - redirects home", async () => {
    await open(p, "/posts/whoops-not-gonna-happen");
    assertSnapshot(t, p.url(), name("redirect url"));
  });
});
