/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { PostPreview } from "../components/PostPreview.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { getExtension } from "../utils/common.ts";
import { Navbar } from "../components/Navbar.tsx";

export type PostMeta = {
  lastUpdate: Date;
  creationDate: Date;
  title: string;
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const path = `./static/static-posts`;
    let posts = {};

    for await (const f of Deno.readDir(path)) {
      if (getExtension(f.name) === "md") {
        const postId = f.name.split(".")[0];
        const meta = JSON.parse(
          await Deno.readTextFile(`${path}/${postId}.json`),
        );
        posts = {
          ...posts,
          [postId]: {
            ...meta,
            lastUpdate: new Date(meta.lastUpdate),
            creationDate: new Date(meta.creationDate),
          } as PostMeta,
        };
      }
    }

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
        <p class={tw`my-10 text-center text-justify font-mono indent-1`}>
          Personal blog page written with Fresh, should contain markdown posts
          below! I'll write mostly about tech & hobby stuff.
        </p>

        {Object.entries(props.data.posts)
          .sort(
            (prev, next) =>
              next[1].lastUpdate.getTime() - prev[1].lastUpdate.getTime(),
          )
          .map(([id, meta], i) => (
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
