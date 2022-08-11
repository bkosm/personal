/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { TextLineStream } from "https://deno.land/std@0.150.0/streams/delimiter.ts";
import * as path from "https://deno.land/std@0.57.0/path/mod.ts";
import {
  default as puppeteer,
  Browser,
} from "https://deno.land/x/puppeteer@14.1.1/mod.ts";
import {
  afterAll,
  beforeAll,
} from "https://deno.land/std@0.148.0/testing/bdd.ts";

type TestBody = (b: Browser, t: Deno.TestContext) => Promise<void>;

export { describe, it } from "https://deno.land/std@0.148.0/testing/bdd.ts";
export {
  assert,
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.150.0/testing/asserts.ts";
export { delay } from "https://deno.land/std@0.150.0/async/delay.ts";

export function browserTest(name: string, fn: TestBody) {
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

      const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

      await fn(browser, t);

      afterAll(async () => {
        await browser.close();
        await serverProcess.close();
      });
    },
    sanitizeOps: false,
    sanitizeResources: false,
  });
}

export const SNAPSHOT_DIR = `${path.dirname(path.fromFileUrl(import.meta.url))}/snapshots`;
