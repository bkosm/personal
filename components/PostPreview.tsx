/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { formatPostName } from "../utils/common.ts";

interface Props extends h.JSX.HTMLAttributes<HTMLAreaElement> {
  name: string;
  lastModified: Date;
}

export function PostPreview(props: Props) {
  return (
    <a
      {...props}
      class={tw`flex justify-between px-2 py-1 border(gray-100 2) transition-all hover:bg-gray-200 flex`}
      href={`/posts/${props.name}`}
    >
      <div>{formatPostName(props.name)}</div>
      <div>
        Last modified at{" "}
        <span class={tw`font-bold`}>{props.lastModified.toLocaleString()}</span>
      </div>
    </a>
  );
}
