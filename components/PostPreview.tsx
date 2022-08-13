/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

// deno-lint-ignore no-empty-interface
interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function PostPreview(props: Props) {
  return (
    <div {...props} class={tw`px-2 py-1 border(gray-100 2) hover:bg-gray-200`}>
      Hi!
    </div>
  );
}
