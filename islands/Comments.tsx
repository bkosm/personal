/** @jsx h */
import { Fragment, h, render } from "preact";
import { useEffect } from "preact/hooks";

interface Props {
  issueName: string;
  gitalkClientID?: string;
  gitalkClientSecret?: string;
}

export default function Comments(props: Props) {
  return (
    <Gitalk
      clientID={props.gitalkClientID ?? "1"}
      clientSecret={props.gitalkClientSecret ?? "none"}
      repo="personal"
      owner="bkosm"
      admin={["bkosm"]}
      pagerDirection="first"
      title={props.issueName}
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
