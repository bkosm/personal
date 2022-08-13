/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {
  sanitizedMarkup: string;
  mode?: "dark" | "light";
}

export function Post(props: Props) {
  return (
    <div
      data-color-mode={props.mode ?? "light"}
      data-light-theme="light"
      data-dark-theme="dark"
      class="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.sanitizedMarkup }}
    ></div>
  );
}
