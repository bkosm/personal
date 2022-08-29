/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../components/Post.tsx";
import { render } from "gfm";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { clean, init } from "https://deno.land/x/ammonia@0.3.1/mod.ts";

import { redirectHomeResponse } from "../../utils/errors.ts";
import { PostStats, PostStatsInfo } from "../../components/PostStats.tsx";
import Comments from "../../islands/Comments.tsx";
import { Navbar } from "../../components/Navbar.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const file = new URL(req.url).pathname.split("/")[2];
    const filename = `./static/static-posts/${file}.md`;
    const metadataFile = `./static/static-posts/${file}.json`;

    let fileContent;
    let metadataContent;
    try {
      fileContent = await Deno.readTextFile(filename);
      metadataContent = await Deno.readTextFile(metadataFile);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return redirectHomeResponse();
      } else {
        throw e;
      }
    }

    const metadata = JSON.parse(metadataContent);
    const markup = render(fileContent);

    const stats = {
      name: file,
      bytes: (await Deno.stat(filename)).size,
      creationDate: new Date(metadata.creationDate),
      lastUpdate: new Date(metadata.lastUpdate),
      title: metadata.title,
    } as PostStatsInfo;

    await init();
    return ctx.render({ sanitizedMarkup: clean(markup), stats });
  },
};

export default function PostPage(props: PageProps) {
  const title = `${props.data.stats.title} - bkosm`;

  return (
    <Fragment>
      <Navbar />
      <div class={tw`relative`}>
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
      </div>
    </Fragment>
  );
}
