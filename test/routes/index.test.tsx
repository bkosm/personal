import { afterAll } from "https://deno.land/std@0.148.0/testing/bdd.ts";
import { intTest, assertSnapshot, assertTitle } from "../deps.ts";
import { assertVisualSnapshot } from "../regression.ts";
import { default as puppeteer } from "https://deno.land/x/puppeteer@14.1.1/mod.ts";

intTest("index page", async (t) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    defaultViewport: { width: 1920, height: 1080 },
  });

  afterAll(async () => {
    await browser.close();
  });

  const page = await browser.newPage();

  await page.goto("http://localhost:8000/", {
    waitUntil: "networkidle2",
  });

  await t.step("page has proper title", async () => {
    await assertTitle(t, page);
  });

  await t.step("visual requirements are met", async () => {
    await assertVisualSnapshot(page, "index1");
  });
});
