/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../components/Post.tsx";
import { render } from "gfm";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { clean, init } from "https://deno.land/x/ammonia@0.3.1/mod.ts";

import { capitalize, replace } from "lodash";
import { redirectHomeResponse } from "../../utils/errors.ts";
import { PostStats, readStats } from "../../components/PostStats.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const file = new URL(req.url).pathname.split("/")[2];
    const filename = `./static/posts/${file}.md`;

    let fileContent;
    try {
      fileContent = await Deno.readFile(filename);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return redirectHomeResponse();
      } else {
        throw e;
      }
    }

    const markdown = new TextDecoder("utf-8").decode(fileContent);
    const markup = render(markdown);
    await init();
    const sanitizedMarkup = clean(markup);
    const stats = readStats(await Deno.stat(filename));

    return ctx.render({ sanitizedMarkup, stats });
  },
};

export default function PostPage(props: PageProps) {
  const title = `${replace(capitalize(props.params.name), /-_/g, " ")} - bkosm`;

  return (
    <main class={tw`relative`}>
      <Header title={title} />
      <article
        class={tw`md:px-20 sm:px-16 px-10 pb-28 2xl:px-60 xl:px-50 lg:px-36`}
      >
        <div class={tw`my-10`}>
          <PostStats stats={props.data.stats} />
        </div>
        <Post sanitizedMarkup={props.data.sanitizedMarkup} />
      </article>
      <Footer />
    </main>
  );
}
