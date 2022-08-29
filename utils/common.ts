import { h } from "preact";
import { replace } from "lodash";

export const getExtension = (path: string) => path.split(".").at(-1)!;
export const getPrefix = (path: string) => path.split(".").at(0)!;
export const formatPostName = (raw: string) => replace(raw, /[_]/g, " ");

export const displayInProd = (
  element: h.JSX.Element,
): h.JSX.Element | undefined =>
  (Deno.env.get("IS_PROD") === "true" && element) || undefined;
