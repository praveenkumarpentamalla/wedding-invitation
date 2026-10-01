// Usage: node build.js <client-folder-name>   e.g. node build.js priya-arjun
import { cpSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const client = process.argv[2];
if (!client) { console.error("Usage: node build.js <client-name>"); process.exit(1); }

const src = join("clients", client);
if (!existsSync(join(src, "weddingData.js"))) {
  console.error(`Missing clients/${client}/weddingData.js`); process.exit(1);
}

const out = join("dist", client);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync("template", out, { recursive: true });                    // master template
cpSync(join(src, "weddingData.js"), join(out, "weddingData.js")); // client details
if (existsSync(join(src, "media")))
  cpSync(join(src, "media"), join(out, "media"), { recursive: true }); // photos/music

console.log(`Built dist/${client}\nDeploy: npx vercel dist/${client} --prod   (or drag the folder into Netlify)`);
