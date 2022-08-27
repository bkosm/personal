import { getExtension } from "../../utils/common.ts";

const pathPrefix = "test/__snapshots__";
const embeddableFiles = [];

for (const f of Deno.readDirSync(pathPrefix)) {
  if (["png", "snap"].includes(getExtension(f.name))) {
    embeddableFiles.push({ name: f.name, path: `${pathPrefix}/${f.name}` });
  }
}

const mapFile = (f: { name: string; path: string }) => `
- \`${f.name}\`

${
  getExtension(f.name) === "snap"
    ? `
\`\`\`
${Deno.readTextFileSync(f.path)}
\`\`\`
`
    : `![](/${f.path})`
}
`;

const output = `
# Test snapshots

${embeddableFiles.map(mapFile).join("")}
`;

Deno.writeTextFileSync(`${pathPrefix}/README.md`, output);
