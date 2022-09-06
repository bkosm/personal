import { replace } from "lodash";

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

export type PostMeta = {
  lastUpdate: Date;
  creationDate: Date;
  title: string;
};

export async function loadPosts(
  path: string,
): Promise<{ [id: string]: PostMeta }> {
  let posts = {};

  for await (const f of Deno.readDir(path)) {
    if (getExtension(f.name) === "md") {
      const postId = f.name.split(".")[0];
      const meta = JSON.parse(
        await Deno.readTextFile(`${path}/${postId}.json`),
      );
      posts = {
        ...posts,
        [postId]: {
          ...meta,
          lastUpdate: new Date(meta.lastUpdate),
          creationDate: new Date(meta.creationDate),
        } as PostMeta,
      };
    }
  }

  return posts;
}
