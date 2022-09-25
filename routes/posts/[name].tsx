/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../components/Post.tsx";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";

import { PostStats } from "../../components/PostStats.tsx";
import Comments from "../../islands/Comments.tsx";
import { Navbar } from "../../components/Navbar.tsx";
import { loadPost } from "../../utils/common.ts";
import { omit } from "lodash";

export const handler: Handlers = {
  async GET(req, ctx) {
    const file = new URL(req.url).pathname.split("/")[2];
    const path = "./static/static-posts";

    const res = await loadPost(path, file);

    if (res.type === "not-found") {
      return res.response;
    } else if (res.type === "success") {
      return ctx.render(omit(res, "type"));
    } else {
      throw res.error;
    }
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
              gitalkCssUrl={Deno.env.get("GITALK_CSS")}
              gitalkJsUrl={Deno.env.get("GITALK_JS")}
            />
          </div>
        </article>

        <Footer />
      </div>
    </Fragment>
  );
}
