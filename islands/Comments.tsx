/** @jsx h */
import { Fragment, h, render } from "preact";
import { tw } from "@twind";
import { useEffect } from "preact/hooks";

import gitalk from "https://cdn.skypack.dev/gitalk";
import o from "https://deno.land/x/lz4@v0.1.2/wasm.js";

// deno-lint-ignore no-empty-interface
interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export default function Comments(props: Props) {
  return (
    <Gitalk
      clientID="1"
      clientSecret="secret"
      repo="bkosm/personal"
      owner="bkosm"
      admin={["bkosm"]}
      pagerDirection="first"
      title="Comments"
    />
  );
}

export interface GitalkProps {
  clientID: string;
  clientSecret: string;
  repo: string;
  owner: string;
  admin: string[];
  pagerDirection: "last" | "first";
  id?: string;
  title?: string;
}

function Gitalk(props: GitalkProps) {
  useEffect(() => {
    const css = document.getElementById("gitalk-css") as HTMLLinkElement;
    css.rel = "stylesheet";
  }, []);

  useEffect(() => {
    const container = document.getElementById("gitalk-container")!;
    render(null, container);
    container.innerHTML = "";
    // deno-lint-ignore no-explicit-any
    new (window as any).Gitalk(props).render(container);
  }, [props.id]);

  return (
    <Fragment>
      <div id="gitalk-container" />
      <link
        id="gitalk-css"
        rel="preload"
        href="https://cdn.pagic.org/gitalk@1.6.2/dist/gitalk.css"
        as="style"
      />
      <script
        defer
        src="https://cdn.pagic.org/gitalk@1.6.2/dist/gitalk.min.js"
      />
    </Fragment>
  );
}
