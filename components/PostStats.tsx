/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { omit } from "lodash";

interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {
  stats: PostStatsInfo;
}

export function PostStats(props: Props) {
  return (
    <div
      {...omit(props, "stats")}
      class={tw`px-2 py-1 transition-all hover:bg-gray-200`}
    >
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
  );
}

export interface PostStatsInfo {
  creationDate: Date;
  lastUpdate: Date;
  bytes: number;
  name: string;
  title: string;
}
