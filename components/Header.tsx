/** @jsx h */
import { h } from "preact";
import { Head as FreshHead } from "$fresh/runtime.ts";

interface Props extends h.JSX.HTMLAttributes<HTMLHeadElement> {
  title?: string;
}

export function Header(props: Props) {
  return (
    <FreshHead {...props}>
      <title>{props.title ?? "bkosm - fresh blog"}</title>
      <meta
        name="description"
        content="bkosm personal blog page implemented with Fresh framework"
      />
    </FreshHead>
  );
}
