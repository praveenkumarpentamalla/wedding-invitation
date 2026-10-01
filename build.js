// Usage: node build.js <client>   OR   CLIENT=<client> node build.js
import { cpSync, rmSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const clients = readdirSync("clients", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

// argument > CLIENT env var > the only client folder, if there is just one
const client = process.argv[2] || process.env.CLIENT || (clients.length === 1 ? clients[0] : null);

if (!client || !clients.includes(client)) {
  console.error(`Pick a client. Available: ${clients.join(", ")}\nSet CLIENT=<name> or run: node build.js <name>`);
  process.exit(1);
}

const src = join("clients", client);
if (!existsSync(join(src, "weddingData.js"))) {
  console.error(`Missing clients/${client}/weddingData.js`);
  process.exit(1);
}

const out = "dist";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync("template", out, { recursive: true });
cpSync(join(src, "weddingData.js"), join(out, "weddingData.js"));
if (existsSync(join(src, "media"))) cpSync(join(src, "media"), join(out, "media"), { recursive: true });

console.log(`Built client "${client}" into dist/`);