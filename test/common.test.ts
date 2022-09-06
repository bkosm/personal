import { loadPosts } from "../utils/common.ts";
import { assertSnapshot, name } from "./deps.ts";

Deno.test("loadPosts", async (t) => {
  const res = await loadPosts("./test/__resources__/posts");

  await t.step("works", async () => {
    await assertSnapshot(t, res, name("test posts"));
  });
});
