/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { config, setup } from "@twind";
import { virtualSheet } from "twind/sheets";
import { CSS } from "gfm";

const sheet = virtualSheet();
sheet.reset();
setup({ ...config, sheet });

const stylesheet = await Deno.readTextFile("./styles/md.css");

function render(ctx: RenderContext, render: InnerRenderFunction) {
  const snapshot = ctx.state.get("twind") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...sheet.target, stylesheet, CSS);
  const newSnapshot = sheet.reset();
  ctx.state.set("twind", newSnapshot);
}

await start(manifest, { render });
