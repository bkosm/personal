import { loadPost, loadPosts, mapPreparedPosts } from "../utils/common.ts";
import { assertSnapshot, name } from "./deps.ts";

Deno.test("loading posts", async (t) => {
  const testPostPath = "./test/__resources__/posts";
  const testPostId = "test";

  const posts = await loadPosts(testPostPath);

  await t.step("getting preview works", async () => {
    await assertSnapshot(t, posts, name("test posts"));
  });

  await t.step(
    "preparing posts sorts them descending by date of update",
    async () => {
      const prepared = mapPreparedPosts(posts, (id, meta, index) => ({
        id,
        meta,
        index,
      }));

      await assertSnapshot(t, prepared, name("prepared posts"));
    },
  );

  await t.step("loading not existing post returns distinct error", async () => {
    const res = await loadPost(testPostPath, "nope!");
    await assertSnapshot(t, res, name("missing post result"));
  });

  await t.step("loading an ok post returns data", async () => {
    const res = await loadPost(testPostPath, testPostId);
    await assertSnapshot(t, res, name("loaded post result"));
  });
});
