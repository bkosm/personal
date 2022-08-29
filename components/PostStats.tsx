/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { omit } from "lodash";
import { getStaticUrl } from "../utils/common.ts";

interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {
  stats: PostStatsInfo;
}

export function PostStats(props: Props) {
  return (
    <div class={tw`lg:flex lg:justify-between`} {...omit(props, "stats")}>
      <div class={tw`p-3 m-3 text-base`}>
        <p>
          Created at <b>{props.stats.creationDate.toLocaleString()}</b>
        </p>
        <p>
          Last modified at <b>{props.stats.lastUpdate.toLocaleString()}</b>
        </p>
        <p>
          Takes <b>{props.stats.bytes}</b> bytes on the disk
        </p>
      </div>
      <div>
        <button
          class={tw`p-3 m-3 bg-yellow-300 transition-all hover:bg-gray-800 cursor-pointer text-center text-dark hover:text-white font-bold rounded`}
        >
          <a href={getStaticUrl(`/static-posts/${props.stats.name}.md`)}>
            Get raw file
          </a>
        </button>
      </div>
    </div>
  );
}

export interface PostStatsInfo {
  creationDate: Date;
  lastUpdate: Date;
  bytes: number;
  name: string;
  title: string;
}
