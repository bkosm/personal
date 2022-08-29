/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { PostPreview } from "../components/PostPreview.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { getExtension } from "../utils/common.ts";
import { Navbar } from "../components/Navbar.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const path = `./static/static-posts`;
    let posts = {};

    for await (const f of Deno.readDir(path)) {
      if (getExtension(f.name) === "md") {
        const postName = f.name.split(".")[0];
        posts = {
          ...posts,
          [postName]: JSON.parse(
            await Deno.readTextFile(`${path}/${postName}.json`),
          ),
        };
      }
    }

    return ctx.render({ posts });
  },
};

export default function Home(
  props: PageProps<{ posts: { [postName: string]: { lastUpdate: string } } }>,
) {
  return (
    <Fragment>
      <Header />
      <Navbar />

      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <p class={tw`my-6`}>
          Personal blog page written with Fresh, should contain markdown posts
          below!
        </p>

        {Object.entries(props.data.posts).map(([name, stats], i) => (
          <PostPreview
            key={`post-${i}`}
            name={name}
            lastModified={new Date(stats.lastUpdate)}
          />
        ))}
      </div>
      <Footer />
    </Fragment>
  );
}
