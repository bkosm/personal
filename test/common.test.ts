import { loadPosts, mapPreparedPosts } from "../utils/common.ts";
import { assertSnapshot, name } from "./deps.ts";

Deno.test("loading posts", async (t) => {
  const res = await loadPosts("./test/__resources__/posts");

  await t.step("works", async () => {
    await assertSnapshot(t, res, name("test posts"));
  });

  const prepared = mapPreparedPosts(res, (id, meta, index) => ({
    id,
    meta,
    index,
  }));

  await t.step("preparing posts sorts them descending by date of update", async () => {
    await assertSnapshot(t, prepared, name("prepared posts"));
  });
});
