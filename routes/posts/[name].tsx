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

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url).pathname.split("/");
    const file = url[2];
    const decoder = new TextDecoder("utf-8");

    let fileContent;
    try {
      fileContent = await Deno.readFile(`./static/posts/${file}.md`);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return redirectHomeResponse();
      } else {
        throw e;
      }
    }

    const markdown = decoder.decode(fileContent);
    const markup = render(markdown);
    await init();
    const sanitizedMarkup = clean(markup);

    return ctx.render({ sanitizedMarkup });
  },
};

export default function PostPage(props: PageProps) {
  const title = `${replace(capitalize(props.params.name), /-_/g, " ")} - bkosm`;

  return (
    <main class={tw`relative`}>
      <Header title={title} />
      <article
        class={tw`md:px-20 sm:px-16 px-10 py-28 2xl:p-60 xl:p-50 lg:p-36`}
      >
        <Post sanitizedMarkup={props.data.sanitizedMarkup} />
      </article>
      <Footer />
    </main>
  );
}
