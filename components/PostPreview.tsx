/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export function PostPreview(props: h.JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} class={tw`px-2 py-1 border(gray-100 2) hover:bg-gray-200`}>
      Hi!
    </div>
  );
}
