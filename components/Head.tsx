/** @jsx h */
import { h } from "preact";
import { Head as FreshHead } from "$fresh/runtime.ts";

export function Head(props: h.JSX.HTMLAttributes<HTMLHeadElement>) {
  return (
    <FreshHead {...props}>
      <title>bkosm - fresh blog</title>
      <meta
        name="description"
        content="bkosm personal blog page implemented with Fresh framework"
      />
    </FreshHead>
  );
}
