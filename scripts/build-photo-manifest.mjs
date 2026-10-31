/**
 * Scans public/foto/<categoria>/ and writes src/data/photos.json with each
 * photo's real dimensions and a tiny blur placeholder, so next/image can
 * reserve space (no layout shift) and fade from blur.
 *
 * Usage: drop JPG/WebP/AVIF files into public/foto/<categoria>/ and run
 *   npm run photos
 *
 * Optional captions: public/foto/<categoria>/_info.json
 *   { "file-name.jpg": { "alt": "Descrizione", "featured": true } }
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/foto");
const OUT = path.resolve("src/data/photos.json");
const EXT = /\.(jpe?g|png|webp|avif)$/i;

const categories = (await fs.readdir(ROOT, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const photos = [];
for (const category of categories) {
  const dir = path.join(ROOT, category);
  let info = {};
  try {
    info = JSON.parse(await fs.readFile(path.join(dir, "_info.json"), "utf8"));
  } catch {}

  const files = (await fs.readdir(dir)).filter((f) => EXT.test(f)).sort();
  for (const file of files) {
    const abs = path.join(dir, file);
    const img = sharp(abs).rotate();
    const { width, height } = await img.metadata();
    const blur = await img.clone().resize(16).blur().jpeg({ quality: 50 }).toBuffer();
    const meta = info[file] ?? {};
    photos.push({
      id: `${category}/${file.replace(EXT, "")}`,
      src: `/foto/${category}/${file}`,
      width,
      height,
      category,
      alt: meta.alt ?? "",
      featured: Boolean(meta.featured),
      blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
    });
  }
}

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(photos, null, 2) + "\n");
console.log(`photos.json: ${photos.length} foto in ${categories.length} categorie`);
