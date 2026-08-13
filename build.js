/**
 * Génère public/index.html à partir de src/data.js.
 *
 * Tout le contenu (projets, veilles, panneaux de lecture) est écrit
 * directement dans le HTML : le site reste lisible par Google et par un
 * navigateur sans JavaScript. Le script app.js ne fait qu'ouvrir, fermer
 * et filtrer ce qui est déjà là.
 *
 * Usage : node build.js
 */

const fs = require('fs');
const path = require('path');

const { DATA, VEILLE, PROFILE, CERTIFICATIONS, DOCUMENTS } = require('./src/data.js');

/* Adresse publique du site — sert au lien canonique, à Open Graph et au
   sitemap. À changer si le domaine change. */
const SITE = process.env.SITE_URL || 'https://haitem-bejaoui.vercel.app';

const OUT = path.join(__dirname, 'public');

/* --- Utilitaires --------------------------------------------------------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** « 1re » et « 2e » en exposant, comme sur la maquette. */
const ord = (s) =>
  esc(s)
    .replace(/\b1re\b/g, '1<sup>re</sup>')
    .replace(/\b2e\b/g, '2<sup>e</sup>');

const chips = (items, cls = 'chip') =>
  `<div class="chips">${items
    .map((t) => `<span class="${cls}">${esc(t)}</span>`)
    .join('')}</div>`;

/* --- Fragments ----------------------------------------------------------- */

const sidebar = () => `
    <aside class="side" id="side" aria-label="Navigation principale">
      <div class="side__top">
        <img class="side__avatar" src="${esc(PROFILE.photo)}" width="74" height="74"
             alt="Portrait de ${esc(PROFILE.name)}">
        <button class="side__close" id="side-close" type="button" aria-label="Fermer le menu">✕</button>
      </div>
      <div class="side__identity">
        <p class="side__name">${esc(PROFILE.name)}</p>
        <span class="side__formation">${esc(PROFILE.formation)}</span>
        <span class="side__year">${ord(PROFILE.year)}</span>
      </div>
      <nav class="side__nav">
        <a href="#projets">01 Projets</a>
        <a href="#motivations">02 Motivations</a>
        <a href="#veille">03 Veille</a>
        <a href="#certifications">04 Certifications</a>
        <a href="#documents">05 Documents</a>
        <a href="#contact">06 Contact</a>
      </nav>
      <div class="side__rule"></div>
      <div class="side__skills">
        ${PROFILE.skills
          .map(
            (g, i) =>
              `<span class="side__skills-label">${
                i === 0 ? 'Compétences · ' : ''
              }${esc(g.group)}</span>${chips(g.items)}`
          )
          .join('\n        ')}
      </div>
      <div class="side__spacer"></div>
      <div class="side__foot">
        <a class="side__cv" href="${esc(PROFILE.cv)}" target="_blank" rel="noopener">CV — PDF</a>
        <div class="side__links">
          <a href="${esc(PROFILE.github)}" target="_blank" rel="noopener">GitHub</a>
          <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </aside>`;

const projectCard = (p, i) => `
          <article class="card" data-cat="${esc(p.cat)}">
            <div class="card__media">
              <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="480" height="158">
            </div>
            <div class="card__body">
              <span class="card__kicker">${esc(p.kicker)}</span>
              <h3><button class="card__trigger" type="button" data-project="${i}"
                          aria-haspopup="dialog">${esc(p.title)}</button></h3>
              <p class="card__summary">${esc(p.summary)}</p>
              ${chips(p.tags, 'chip chip--sm')}
              <span class="card__more">détail →</span>
            </div>
          </article>`;

const projectPanel = (p, i) => `
    <div class="overlay" id="project-${i}" data-overlay hidden>
      <aside class="panel" role="dialog" aria-modal="true" aria-labelledby="project-${i}-title">
        <button class="panel__back" data-close type="button">← retour</button>
        <div class="panel__head">
          <span class="panel__kicker">${esc(p.kicker)}</span>
          <button class="panel__close" data-close type="button">fermer ✕</button>
        </div>
        <h2 id="project-${i}-title">${esc(p.title)}</h2>
        <div class="panel__media">
          <img src="${esc(p.image)}" alt="Schéma du projet : ${esc(p.title)}" loading="lazy">
        </div>
        ${chips(p.tags, 'chip chip--sm')}
        <div class="panel__fields">
          <div class="field"><span class="field__label">Contexte</span><p>${esc(p.context)}</p></div>
          <div class="field"><span class="field__label">Mon rôle</span><p>${esc(p.role)}</p></div>
          <div class="field"><span class="field__label">Résultat</span><p>${esc(p.result)}</p></div>
          <div class="field"><span class="field__label">Appris</span><p>${esc(p.learned)}</p></div>
        </div>
        ${
          p.docs && p.docs.length
            ? `<div class="panel__docs">
          <span class="box__label">Documents du projet</span>
          <div class="panel__docs-links">
            ${p.docs
              .map(
                (d) =>
                  `<a class="doc-btn" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(
                    d.label
                  )} ↓</a>`
              )
              .join('\n            ')}
          </div>
        </div>`
            : ''
        }
      </aside>
    </div>`;

const veillePanel = (v, i) => {
  const blocks = v.blocks
    .map(
      (b) => `
        <div class="block">
          ${b.heading ? `<h3>${esc(b.heading)}</h3>` : ''}
          ${(b.paras || []).map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
          ${(b.items || [])
            .map(
              (it) =>
                `<div class="item"><span class="item__label">${esc(
                  it.label
                )}</span><p>${esc(it.text)}</p></div>`
            )
            .join('\n          ')}
        </div>`
    )
    .join('');

  return `
    <div class="overlay" id="veille-${i}" data-overlay hidden>
      <aside class="panel panel--wide" role="dialog" aria-modal="true" aria-labelledby="veille-${i}-title">
        <button class="panel__back" data-close type="button">← retour</button>
        <div class="panel__head">
          <span class="panel__kicker">Veille · ${esc(v.tag)} · ${esc(v.date)}</span>
          <button class="panel__close" data-close type="button">fermer ✕</button>
        </div>
        <h2 id="veille-${i}-title">${esc(v.title)}</h2>
        <p class="panel__lead">${esc(v.lead)}</p>${blocks}
      </aside>
    </div>`;
};

const certCard = (c) =>
  c.badge
    ? `
        <div class="cert">
          <img class="cert__badge" src="${esc(c.badge)}" width="88" height="88"
               alt="Badge du certificat ${esc(c.title)}" loading="lazy">
          <div class="cert__head">
            <h3>${esc(c.title)}</h3>
            <span class="cert__meta">${esc(c.meta)}</span>
          </div>
          <p>${esc(c.description)}</p>
          ${chips(['Réseaux', 'Systèmes', 'Sécurité'], 'chip chip--sm')}
          <div class="cert__links">
            <a href="${esc(c.verifyUrl)}" target="_blank" rel="noopener">vérifier le certificat →</a>
            <a href="${esc(c.pdf)}" target="_blank" rel="noopener">attestation PDF →</a>
          </div>
        </div>`
    : `
        <div class="cert cert--todo">
          <div class="cert__placeholder">…</div>
          <div class="cert__head">
            <h3>${esc(c.title)}</h3>
            <span class="cert__meta">${esc(c.meta)}</span>
          </div>
          <p>${esc(c.description)}</p>
        </div>`;

const docRow = (d) => `
        <a class="doc" href="${esc(d.url)}" target="_blank" rel="noopener">
          <span class="doc__tag"><span class="chip chip--tag">${esc(d.tag)}</span></span>
          <span class="doc__body">
            <span class="doc__title">${ord(d.title)}</span>
            <span class="doc__desc">${esc(d.description)}</span>
          </span>
          <span class="doc__size">PDF · ${esc(d.size)}</span>
          <span class="doc__arrow">↓</span>
        </a>`;

/* --- Données structurées (référencement) --------------------------------- */

const jsonLd = JSON.stringify(
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Haitem Bejaoui',
    alternateName: PROFILE.name,
    jobTitle: 'Étudiant en BTS SIO option SISR',
    description: PROFILE.intro,
    email: `mailto:${PROFILE.email.toLowerCase()}`,
    telephone: PROFILE.phone.tel,
    url: SITE,
    image: `${SITE}/${PROFILE.photo}`,
    sameAs: [PROFILE.github, PROFILE.linkedin],
    address: { '@type': 'PostalAddress', addressRegion: 'Var', addressCountry: 'FR' },
    knowsAbout: PROFILE.skills.flatMap((g) => g.items),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google IT Support',
      credentialCategory: 'Professional Certificate',
      recognizedBy: { '@type': 'Organization', name: 'Google' },
    },
    seeks: {
      '@type': 'Demand',
      name: "Stage ou alternance en administration réseau et systèmes (Var, Marseille)",
    },
  },
  null,
  2
);

/* --- Document ------------------------------------------------------------ */

const featured = VEILLE.slice(0, 3);
const more = VEILLE.slice(3);

const description =
  "Portfolio de Haitem Bejaoui, étudiant en BTS SIO option SISR : projets d'infrastructure réseau, veille technologique en cybersécurité, certifications et documents. Recherche un stage ou une alternance dans le Var et à Marseille.";

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(PROFILE.name)} — Portfolio BTS SIO SISR | Réseaux &amp; systèmes</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Haitem Bejaoui">
<link rel="canonical" href="${SITE}/">
<meta name="theme-color" content="#14181a">
<meta name="robots" content="index, follow">

<meta property="og:type" content="profile">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Portfolio ${esc(PROFILE.name)}">
<meta property="og:title" content="${esc(PROFILE.name)} — Portfolio BTS SIO SISR">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}/">
<meta property="og:image" content="${SITE}/${esc(PROFILE.photo)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(PROFILE.name)} — Portfolio BTS SIO SISR">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/${esc(PROFILE.photo)}">

<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="favicon.svg">

<link rel="preload" as="font" type="font/woff2" href="fonts/space-grotesk-latin-500-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="fonts/space-grotesk-latin-400-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="fonts/jetbrains-mono-latin-400-normal.woff2" crossorigin>
<link rel="stylesheet" href="styles.css">

<script type="application/ld+json">
${jsonLd}
</script>
</head>
<body>

<div id="boot" aria-hidden="true">
  <span class="boot__name">${esc(PROFILE.name)}</span>
  <div class="boot__track"><div class="boot__bar"></div></div>
  <span class="boot__label">chargement du portfolio</span>
</div>

<header class="topbar">
  <button class="burger" id="burger" type="button" aria-label="Ouvrir le menu"
          aria-controls="side" aria-expanded="false">
    <span></span><span></span>
  </button>
  <span class="topbar__name">${esc(PROFILE.name)}</span>
  <a class="topbar__cv" href="${esc(PROFILE.cv)}" target="_blank" rel="noopener">CV</a>
</header>

<div class="scrim" id="scrim"></div>

<div class="root">
${sidebar()}

  <main class="main">

    <header class="hero">
      <span class="hero__kicker">Portfolio · Réseaux &amp; systèmes</span>
      <h1>${esc(PROFILE.headline)}</h1>
      <p>${esc(PROFILE.intro)}</p>
      <div class="hero__status">
        <span class="dot"></span>
        <span>${ord(PROFILE.status)}</span>
      </div>
    </header>

    <section class="section" id="projets" aria-labelledby="projets-title">
      <div class="section__head">
        <h2 id="projets-title"><span class="section__num">01</span>Projets</h2>
        <span class="section__meta" id="project-count">${DATA.length} projets</span>
      </div>
      <div class="filters" role="group" aria-label="Filtrer les projets">
        ${['Tous', 'Réseau', 'Systèmes', 'Sécurité']
          .map(
            (f, i) =>
              `<button class="filter" type="button" data-filter="${esc(f)}" aria-pressed="${
                i === 0 ? 'true' : 'false'
              }">${esc(f)}</button>`
          )
          .join('\n        ')}
        <span class="filters__active" id="filter-active"></span>
      </div>
      <div class="grid-2" id="project-grid">${DATA.map(projectCard).join('')}
        <div class="card--ghost">+ prochain projet</div>
      </div>
    </section>

    <section class="section" id="motivations" aria-labelledby="motivations-title">
      <div class="section__head">
        <h2 id="motivations-title"><span class="section__num">02</span>Motivations</h2>
        <span class="section__meta">pourquoi le réseau</span>
      </div>
      <div class="col-2">
        <div class="prose">
          ${PROFILE.motivations.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
        </div>
        <div class="panel-stack">
          <div class="box box--filled">
            <span class="box__label box__label--accent">Ce qui me motive</span>
            ${PROFILE.motivations.drivers
              .map((d, i) =>
                i === 0
                  ? `<span class="box__line">${esc(d)}</span>`
                  : `<div class="box__rule"></div><span class="box__line">${esc(d)}</span>`
              )
              .join('\n            ')}
          </div>
          <div class="box">
            <span class="box__label">Objectif</span>
            <span class="box__line">${esc(PROFILE.motivations.objective)}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="veille" aria-labelledby="veille-title">
      <div class="section__head">
        <h2 id="veille-title"><span class="section__num">03</span>Veille technologique</h2>
        <span class="section__meta">${VEILLE.length} veilles · cybersécurité, IA, réseau</span>
      </div>
      <div class="veille">
        <div class="veille__list">
          ${featured
            .map(
              (v, i) => `<article class="veille__item">
            <span class="veille__date">${esc(v.date)}</span>
            <div class="veille__body">
              <h3><button class="veille__trigger" type="button" data-veille="${i}"
                          aria-haspopup="dialog">${esc(v.title)}</button></h3>
              <p>${esc(v.summary)}</p>
              <span class="veille__read">${esc(v.tag)} · lire →</span>
            </div>
          </article>`
            )
            .join('\n          ')}
          <button class="veille__toggle" id="veille-toggle" type="button"
                  aria-expanded="false" aria-controls="veille-more">plus de veilles (${more.length})</button>
          <div class="veille__more" id="veille-more" hidden>
            ${more
              .map(
                (v, i) => `<article class="veille__row">
              <span class="veille__row-tag"><span class="chip chip--tag">${esc(v.tag)}</span></span>
              <div class="veille__row-body">
                <span class="veille__row-title"><button class="veille__trigger" type="button"
                        data-veille="${i + 3}" aria-haspopup="dialog">${esc(v.title)}</button></span>
                <span class="veille__row-summary">${esc(v.summary)}</span>
              </div>
              <span class="veille__row-date">${esc(v.date)}</span>
              <span class="veille__row-arrow">→</span>
            </article>`
              )
              .join('\n            ')}
          </div>
        </div>
        <aside class="veille__aside" aria-label="Méthode et sources de veille">
          <div class="box">
            <span class="box__label">Méthode</span>
            <span class="box__line">${esc(PROFILE.veilleMethod)}</span>
          </div>
          <div class="box">
            <span class="box__label">Sources suivies</span>
            <span class="box__line">${esc(PROFILE.veilleSources.join(' · '))}</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section" id="certifications" aria-labelledby="certifications-title">
      <div class="section__head">
        <h2 id="certifications-title"><span class="section__num">04</span>Certifications</h2>
        <span class="section__meta">1 obtenue · 1 en préparation</span>
      </div>
      <div class="grid-auto">${CERTIFICATIONS.map(certCard).join('')}
      </div>
    </section>

    <section class="section section--tight" id="documents" aria-labelledby="documents-title">
      <div class="section__head">
        <h2 id="documents-title"><span class="section__num">05</span>Documents</h2>
        <span class="section__meta">CV · synthèse E4 · attestations</span>
      </div>
      <div class="docs">${DOCUMENTS.map(docRow).join('')}
      </div>
    </section>

    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="section__head">
        <h2 id="contact-title"><span class="section__num">06</span>Contact</h2>
      </div>
      <div class="contact">
        <div class="contact__left">
          <p>Je cherche un stage ou une alternance en réseaux et systèmes pour ma deuxième année, dans le Var, à Marseille et alentours.</p>
          <div class="contact__coords">
            <button class="contact__mail" id="copy-mail" type="button"
                    data-mail="${esc(PROFILE.email)}" title="Cliquer pour copier">
              <span>${esc(PROFILE.email)}</span>
              <span class="contact__copy" id="copy-label">copier</span>
            </button>
            <a class="contact__phone" href="tel:${esc(PROFILE.phone.tel)}">${esc(
  PROFILE.phone.display
).replace(/ /g, '&nbsp;')}</a>
          </div>
        </div>
        <div class="contact__links">
          <a class="btn-outline" href="${esc(PROFILE.github)}" target="_blank" rel="noopener">GitHub</a>
          <a class="btn-outline" href="${esc(
            PROFILE.linkedin
          )}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <div class="foot">
        <span>${esc(PROFILE.name)} — BTS SIO SISR</span>
        <span>2026</span>
      </div>
    </section>

  </main>
</div>
${DATA.map(projectPanel).join('')}
${VEILLE.map(veillePanel).join('')}

<script src="app.js" defer></script>
</body>
</html>
`;

/* --- Fichiers annexes ---------------------------------------------------- */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#14181a"/>
  <text x="32" y="43" font-family="ui-monospace, monospace" font-size="30"
        font-weight="500" fill="#4ee39a" text-anchor="middle">HB</text>
</svg>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`.replace('www.sitemap.org', 'www.sitemaps.org');

/* Les gabarits laissent des espaces en fin de ligne : on nettoie. */
const cleaned = html
  .split('\n')
  .map((line) => line.replace(/\s+$/, ''))
  .join('\n');

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), cleaned);
fs.writeFileSync(path.join(OUT, 'favicon.svg'), favicon);
fs.writeFileSync(path.join(OUT, 'robots.txt'), robots);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);

console.log(
  `index.html généré (${(html.length / 1024).toFixed(1)} Ko) — ${DATA.length} projets, ${
    VEILLE.length
  } veilles, ${DOCUMENTS.length} documents.`
);
