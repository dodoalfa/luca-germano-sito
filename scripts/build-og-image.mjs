// Builds public/og.jpg (1200x630), the preview image shown when the site is
// shared on WhatsApp, Facebook, etc.: a hero photo with the logo on top.
// Run after `npm run photos` (it is chained there) so it uses the real photos.
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const photos = JSON.parse(await readFile(path.join(root, "src/data/photos.json"), "utf8"));
const landscape = photos.filter((p) => p.width > p.height);
const hero = landscape.find((p) => p.featured) ?? landscape.find((p) => p.category === "matrimoni") ?? landscape[0] ?? photos[0];
if (!hero) throw new Error("Nessuna foto trovata in src/data/photos.json");

const W = 1200;
const H = 630;
const shade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><radialGradient id="g" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#000" stop-opacity=".35"/><stop offset="100%" stop-color="#000" stop-opacity=".75"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`
);

// White logo: the SVG uses a black fill, swap it before rasterising.
const logoSvg = (await readFile(path.join(root, "public/logo/luca-germano-logo.svg"), "utf8")).replace(/fill="#000"/g, 'fill="#fff"');
const logo = await sharp(Buffer.from(logoSvg), { density: 300 }).resize({ width: 640 }).png().toBuffer();
const { height: lh = 0 } = await sharp(logo).metadata();

await sharp(path.join(root, "public", hero.src))
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([
    { input: shade },
    { input: logo, left: Math.round((W - 640) / 2), top: Math.round((H - lh) / 2) },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "public/og.jpg"));

console.log(`og.jpg creato da ${hero.src}`);
