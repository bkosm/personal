/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { omit } from "lodash";

interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {
  stats: PostStatsInfo;
}

export function PostStats(props: Props) {
  const createdAtString = props.stats?.creationDate?.toLocaleString();
  const lastModifiedString = props.stats?.lastUpdate?.toLocaleString();

  return (
    <div
      {...omit(props, "stats")}
      class={tw`px-2 py-1 border(gray-100 2) hover:bg-gray-200`}
    >
      {createdAtString && (
        <p>
          Created at <b>{props.stats?.creationDate?.toLocaleString()}</b>
        </p>
      )}
      {lastModifiedString && (
        <p>
          Last modified at <b>{props.stats?.lastUpdate?.toLocaleString()}</b>
        </p>
      )}
      <p>
        Takes <b>{props.stats.bytes}</b> bytes on the disk
      </p>
    </div>
  );
}

export interface PostStatsInfo {
  creationDate?: Date;
  lastUpdate?: Date;
  bytes: number;
}

export function readStats(info: Deno.FileInfo): PostStatsInfo {
  return {
    creationDate: info.birthtime,
    lastUpdate: info.mtime,
    bytes: info.size,
  } as PostStatsInfo;
}
