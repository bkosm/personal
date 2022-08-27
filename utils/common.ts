import { capitalize, replace } from "lodash";

export const getExtension = (path: string) => path.split(".").at(-1)!;
export const formatPostName = (raw: string) =>
  replace(capitalize(raw), /[-_]/g, " ");
