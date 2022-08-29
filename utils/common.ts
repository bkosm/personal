import { replace } from "lodash";

export const getExtension = (path: string) => path.split(".").at(-1)!;
export const formatPostName = (raw: string) => replace(raw, /[_]/g, " ");
