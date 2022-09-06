/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { formatPostName } from "../utils/common.ts";

interface Props extends h.JSX.HTMLAttributes<HTMLAnchorElement> {
  name: string;
  postId: string;
  lastModified: Date;
}

export function PostPreview(props: Props) {
  return (
    <a
      class={tw`flex justify-between px-2 py-1 border(gray-100 2) transition-all hover:bg-gray-200 my-2`}
      href={`/posts/${props.postId}`}
      {...props}
    >
      <div>{props.name}</div>
      <div>
        Last modified at{" "}
        <span class={tw`font-bold`}>{props.lastModified.toLocaleString()}</span>
      </div>
    </a>
  );
}
