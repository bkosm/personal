import { getExtension, getPrefix } from "../../utils/common.ts";

const pathPrefix = "test/__snapshots__";
const toApprove = [];

for (const f of Deno.readDirSync(pathPrefix)) {
  if ("png" === getExtension(f.name) && "actual" === getPrefix(f.name)) {
    const middlePart = f.name.split(".")[1];

    toApprove.push({
      origin: `${pathPrefix}/${f.name}`,
      final: `${pathPrefix}/approved.${middlePart}.png`,
    });
  }
}

for (const f of toApprove) {
  Deno.copyFileSync(f.origin, f.final);
  Deno.removeSync(f.origin);
}
