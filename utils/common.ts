import { replace } from "lodash";
import { PostStatsInfo } from "../components/PostStats.tsx";
import { redirectHomeResponse } from "./errors.ts";
import { render } from "gfm";
import { clean, init } from "https://deno.land/x/ammonia@0.3.1/mod.ts";

export const getExtension = (path: string) => path.split(".").at(-1)!;
export const getPrefix = (path: string) => path.split(".").at(0)!;
export const formatPostName = (raw: string) => replace(raw, /[_]/g, " ");

export function getInProd<T>(element: T): T | undefined {
  return (Deno.env.get("IS_PROD") === "true" && element) || undefined;
}

export function getStaticUrl(path: string): string {
  const root = Deno.env.get("STATIC_DIR_ROOT");

  if (!root) {
    throw new Error("STATIC_DIR_ROOT is not set");
  }

  return `${root}${path}`;
}

function parseDate(date: string): Date | undefined {
  const maybeDate = new Date(date);
  return !isNaN(maybeDate.getTime()) ? maybeDate : undefined;
}

export type PostMeta = {
  lastUpdate: Date;
  creationDate: Date;
  title: string;
  visible: boolean;
};

export type Posts = { [id: string]: PostMeta };

async function loadMeta(path: string): Promise<PostMeta | undefined> {
  const meta = JSON.parse(await Deno.readTextFile(path));
  const creationDate = parseDate(meta.creationDate);
  const lastUpdate = parseDate(meta.lastUpdate);

  if (!creationDate || !lastUpdate) {
    return undefined;
  } else {
    return {
      ...meta,
      lastUpdate,
      creationDate,
    } as PostMeta;
  }
}

export async function loadPosts(path: string): Promise<Posts> {
  let posts = {};

  for await (const f of Deno.readDir(path)) {
    if (getExtension(f.name) === "md") {
      const postId = f.name.split(".")[0];
      const filepath = `${path}/${postId}.json`;
      posts = {
        ...posts,
        [postId]: (await loadMeta(filepath))!,
      };
    }
  }
  return posts;
}

export function mapPreparedPosts<T>(
  posts: Posts,
  fn: (id: string, meta: PostMeta, index: number) => T
): T[] {
  return Object.entries(posts)
    .filter(([_, meta], __) => meta.visible && meta.title)
    .sort(
      (prev, next) =>
        next[1].lastUpdate.getTime() - prev[1].lastUpdate.getTime()
    )
    .map(([id, meta], i) => fn(id, meta, i));
}

export type LoadPostResult =
  | { type: "success"; sanitizedMarkup: string; stats: PostStatsInfo }
  | { type: "not-found"; response: Response }
  | { type: "error"; error: Error };

export async function loadPost(
  path: string,
  file: string
): Promise<LoadPostResult> {
  const filename = `${path}/${file}.md`;
  const metadataFile = `${path}/${file}.json`;

  try {
    const markup = render(await Deno.readTextFile(filename));
    const metadata = (await loadMeta(metadataFile))!;

    const stats = {
      name: file,
      bytes: (await Deno.stat(filename)).size,
      creationDate: metadata.creationDate,
      lastUpdate: metadata.lastUpdate,
      title: metadata.title,
    } as PostStatsInfo;

    await init();
    const sanitizedMarkup = clean(markup);
    return { type: "success", sanitizedMarkup, stats };
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return { type: "not-found", response: redirectHomeResponse() };
    } else {
      return { type: "error", error: e };
    }
  }
}
