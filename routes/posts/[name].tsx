/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../components/Post.tsx";
import { render } from "gfm";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { clean, init } from "https://deno.land/x/ammonia@0.3.1/mod.ts";

import { capitalize, replace } from "lodash";
import { redirectHomeResponse } from "../../utils/errors.ts";
import { PostStats, PostStatsInfo } from "../../components/PostStats.tsx";
import Comments from "../../islands/Comments.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const file = new URL(req.url).pathname.split("/")[2];
    const filename = `./static/posts/${file}.md`;
    const metadataFile = `./static/posts/${file}.json`;

    let fileContent;
    let metadataContent;
    try {
      fileContent = await Deno.readFile(filename);
      metadataContent = await Deno.readFile(metadataFile);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return redirectHomeResponse();
      } else {
        throw e;
      }
    }

    const decoder = new TextDecoder("utf-8");
    const markdown = decoder.decode(fileContent);
    const metadata = JSON.parse(decoder.decode(metadataContent));

    const markup = render(markdown);
    const stats = {
      name: file,
      bytes: (await Deno.stat(filename)).size,
      creationDate: new Date(metadata.creationDate),
      lastUpdate: new Date(metadata.lastUpdate),
    } as PostStatsInfo;

    await init();
    return ctx.render({ sanitizedMarkup: clean(markup), stats });
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
        <div class={tw`my-10`}>
          <Comments
            issueName={props.data.stats.name}
            gitalkClientID={Deno.env.get("GITALK_CLIENT_ID")}
            gitalkClientSecret={Deno.env.get("GITALK_CLIENT_SECRET")}
          />
        </div>
      </article>
      <Footer />
    </main>
  );
}
