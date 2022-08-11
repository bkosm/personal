import { browserTest, assertStringIncludes } from "../test.deps.ts";

browserTest("index page", async (b, t) => {
  const page = await b.newPage();

  await page.goto("http://localhost:8000/", {
    waitUntil: "networkidle2",
  });

  await t.step("text loads", async () => {
    const pElem = await page.waitForSelector('div > p');
    const pText = await pElem?.evaluate(el => el.textContent);

    assertStringIncludes(pText, "Welcome to `fresh`");
  });
});
