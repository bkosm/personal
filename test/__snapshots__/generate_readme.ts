import { getExtension, getPrefix } from "../../utils/common.ts";

const pathPrefix = "test/__snapshots__";
const embeddableFiles = [];

for (const f of Deno.readDirSync(pathPrefix)) {
  if (
    (getExtension(f.name) === "png" && getPrefix(f.name) === "approved") ||
    getExtension(f.name) === "snap"
  ) {
    embeddableFiles.push({ name: f.name, path: `${pathPrefix}/${f.name}` });
  }
}

const mapFile = (f: { name: string; path: string }) =>
  `- \`${f.name}\`

${
    getExtension(f.name) === "snap"
      ? `\`\`\`
${Deno.readTextFileSync(f.path)}\`\`\``
      : `![](/${f.path})`
  }
`;

const output = `# Test snapshots

${embeddableFiles.map(mapFile).join("\n")}`;

Deno.writeTextFileSync(`${pathPrefix}/README.md`, output);
