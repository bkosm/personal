/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { PostPreview } from "../components/PostPreview.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { loadPosts, mapPreparedPosts, PostMeta } from "../utils/common.ts";
import { Navbar } from "../components/Navbar.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const posts = await loadPosts(`./static/static-posts`);
    return ctx.render({ posts });
  },
};

export default function Home(
  props: PageProps<{ posts: { [postId: string]: PostMeta } }>,
) {
  return (
    <Fragment>
      <Header />
      <Navbar />

      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <p class={tw`my-10 text-justify font-mono indent-1`}>
          Personal blog page written with Fresh, should contain markdown posts
          below! I'll write mostly about tech & hobby stuff.
        </p>

        {mapPreparedPosts(props.data.posts, (id, meta, i) => (
          <PostPreview
            key={`post-${i}`}
            postId={id}
            name={meta.title}
            lastModified={meta.lastUpdate}
          />
        ))}
      </div>
      <Footer />
    </Fragment>
  );
}
