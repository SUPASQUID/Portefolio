/**
 * Optimise les images servies par le site.
 * Les fichiers d'origine restent intacts dans originaux/assets/ ;
 * ce script les relit à chaque fois et réécrit public/assets/.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'originaux', 'assets');
const OUT = path.join(__dirname, 'public', 'assets');

const jobs = [
  // Photo de profil : affichée en cercle de 74px (56px sur mobile).
  // 480px de large couvre les écrans haute densité et sert d'image de partage.
  { file: 'portrait-haitem.jpg', width: 480, format: 'jpeg', quality: 82 },
  // Badge : affiché en 88px.
  { file: 'badge-google-it-support.png', width: 264, format: 'png' },
  // Schémas de projets : affichés au plus large dans le panneau (~640px).
  { file: 'projet-1-schema-logique.png', width: 1096, format: 'png' },
  { file: 'projet-2-labo-virtualbox.png', width: 1400, format: 'png' },
];

(async () => {
  let before = 0;
  let after = 0;

  for (const job of jobs) {
    const src = path.join(SRC, job.file);
    const out = path.join(OUT, job.file);
    const originalSize = fs.statSync(src).size;

    let img = sharp(src).resize({ width: job.width, withoutEnlargement: true });
    img = job.format === 'jpeg'
      ? img.jpeg({ quality: job.quality, mozjpeg: true })
      : img.png({ compressionLevel: 9, palette: true });

    const buf = await img.toBuffer();
    fs.writeFileSync(out, buf);

    before += originalSize;
    after += buf.length;
    console.log(
      `${job.file.padEnd(32)} ${(originalSize / 1024).toFixed(0).padStart(5)} Ko  ->  ${(
        buf.length / 1024
      ).toFixed(0).padStart(5)} Ko`
    );
  }

  console.log(
    `\nTotal images : ${(before / 1024).toFixed(0)} Ko -> ${(after / 1024).toFixed(0)} Ko ` +
      `(${(100 - (after / before) * 100).toFixed(0)} % en moins)`
  );
})();
