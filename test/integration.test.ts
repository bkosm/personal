import { afterAll } from "https://deno.land/std@0.148.0/testing/bdd.ts";
import { assertTitle, intTest } from "./deps.ts";
import { assertVisualSnapshot } from "./regression.ts";
import { default as puppeteer } from "https://deno.land/x/puppeteer@14.1.1/mod.ts";

const HOST = "http://localhost:8000";

intTest("webdriver tests", async (t) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    defaultViewport: { width: 1920, height: 1080 },
  });

  afterAll(async () => {
    await browser.close();
  });

  const page = await browser.newPage();

  // Index page
  await page.goto(`${HOST}/`, {
    waitUntil: "networkidle2",
  });

  await t.step("index page - has proper title", async () => {
    await assertTitle(t, page);
  });

  await t.step("index page - visual requirements are met", async () => {
    await assertVisualSnapshot(page, "index1");
  });

  // Post page
  await page.goto(`${HOST}/posts/test`, {
    waitUntil: "networkidle2",
  });

  await t.step("post page - visual requirements are met", async () => {
    await assertVisualSnapshot(page, "posts1");
  });
});
