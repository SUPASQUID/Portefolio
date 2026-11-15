/**
 * Génère public/index.html et les pages de pied de page à partir de src/data.js.
 *
 * L'arborescence des rubriques suit la maquette imposée par l'école
 * (SK PORTFOLIO) : Accueil, Compétences BTS SIO, Réalisations en centre,
 * Réalisations en entreprise, Veille technologique, Cybersécurité, Contact,
 * plus quatre pages légales en pied de page.
 *
 * Tout le contenu est écrit directement dans le HTML : le site reste lisible
 * par Google et par un navigateur sans JavaScript. Le script app.js ne fait
 * qu'ouvrir, fermer et filtrer ce qui est déjà là.
 *
 * Les identifiants et attributs suivants sont pilotés par public/app.js : les
 * changer casse l'interactivité. #boot #burger #scrim #side #side-close
 * #project-count #filter-active #veille-toggle #veille-more #copy-mail
 * #copy-label, .panel, [data-overlay] [data-close] [data-cat] [data-filter]
 * [data-project] [data-veille] [data-mission], .side__nav a
 *
 * Usage : node build.js
 */

const fs = require('fs');
const path = require('path');

const {
  DATA,
  ENTREPRISE,
  VEILLE,
  PROFILE,
  CERTIFICATIONS,
  CYBER,
  DOCUMENTS,
  LEGAL,
} = require('./src/data.js');

/* Adresse publique du site — sert au lien canonique, à Open Graph et au
   sitemap. À changer si le domaine change. */
const SITE = process.env.SITE_URL || 'https://bejaoui-haitem.vercel.app';

const OUT = path.join(__dirname, 'public');

/* Teintes reprises de public/styles.css (jetons --bg et --a). */
const THEME_BG = '#f7f8fa';
const THEME_A = '#1f5f9e';

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

/** Les missions de stage sont numérotées à plat pour leurs panneaux. */
const MISSIONS = ENTREPRISE.flatMap((e) =>
  e.missions.map((m) => Object.assign({}, m, { org: e.org, period: e.period }))
);

/* --- Fragments ----------------------------------------------------------- */

const NAV = [
  ['accueil', 'Accueil'],
  ['competences', 'Compétences BTS SIO'],
  ['centre', 'Réalisations en centre'],
  ['entreprise', 'Réalisations en entreprise'],
  ['veille', 'Veille technologique'],
  ['cybersecurite', 'Cybersécurité'],
  ['contact', 'Contact'],
];

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
        ${NAV.map(
          ([id, label], i) =>
            `<a href="#${id}"><span class="side__nav-num">${String(i + 1).padStart(
              2,
              '0'
            )}</span>${esc(label)}</a>`
        ).join('\n        ')}
      </nav>
      <div class="side__rule"></div>
      <div class="side__spacer"></div>
      <div class="side__foot">
        <a class="side__cv" href="${esc(PROFILE.cv)}" target="_blank" rel="noopener">CV — PDF</a>
        <div class="side__links">
          <a href="${esc(PROFILE.github)}" target="_blank" rel="noopener">GitHub</a>
          <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </aside>`;

/** Barre de compétence : niveau sur 4, rendu en segments. */
const skillBar = (s) => `
          <div class="bar" data-level="${s.level}">
            <div class="bar__head">
              <span class="bar__label">${esc(s.label)}</span>
              <span class="bar__level" aria-hidden="true">${s.level}/4</span>
            </div>
            <div class="bar__track" role="img"
                 aria-label="${esc(s.label)} : niveau ${s.level} sur 4">
              ${[1, 2, 3, 4]
                .map(
                  (n) =>
                    `<span class="bar__seg${n <= s.level ? ' bar__seg--on' : ''}"></span>`
                )
                .join('')}
            </div>
            <span class="bar__note">${esc(s.note)}</span>
          </div>`;

const projectCard = (p, i) => `
          <article class="card" data-cat="${esc(p.cat)}">
            <div class="card__media">
              <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="480" height="158">
            </div>
            <div class="card__body">
              <span class="card__kicker">${ord(p.year)} · ${esc(p.kicker)}</span>
              <h3><button class="card__trigger" type="button" data-project="${i}"
                          aria-haspopup="dialog">${esc(p.title)}</button></h3>
              <p class="card__summary">${esc(p.summary)}</p>
              ${chips(p.tags, 'chip chip--sm')}
              <span class="card__more">détail →</span>
            </div>
          </article>`;

/** Panneau de détail, commun aux projets et aux missions de stage. */
const detailPanel = (p, id, kicker, withMedia) => `
    <div class="overlay" id="${id}" data-overlay hidden>
      <aside class="panel" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        <button class="panel__back" data-close type="button">← retour</button>
        <div class="panel__head">
          <span class="panel__kicker">${kicker}</span>
          <button class="panel__close" data-close type="button">fermer ✕</button>
        </div>
        <h2 id="${id}-title">${esc(p.title)}</h2>
        ${
          withMedia && p.image
            ? `<div class="panel__media">
          <img src="${esc(p.image)}" alt="Schéma du projet : ${esc(p.title)}" loading="lazy">
        </div>`
            : ''
        }
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

const projectPanel = (p, i) =>
  detailPanel(p, `project-${i}`, `${ord(p.year)} · ${esc(p.kicker)}`, true);

const missionPanel = (m, i) =>
  detailPanel(m, `mission-${i}`, `Stage · ${esc(m.org)} · ${esc(m.period)}`, false);

/** Bloc d'une expérience en entreprise, avec ses missions. */
const entrepriseBlock = (e, offset) => `
        <article class="exp">
          <header class="exp__head">
            <div>
              <span class="exp__kicker">${esc(e.kind)} · ${ord(e.year)}</span>
              <h3 class="exp__org">${esc(e.org)}</h3>
              <span class="exp__meta">${esc(e.orgMeta)}</span>
            </div>
            <div class="exp__when">
              <span class="exp__period">${esc(e.period)}</span>
              <span class="exp__duration">${esc(e.duration)}</span>
            </div>
          </header>
          <p class="exp__about">${esc(e.about)}</p>
          <div class="exp__facts">
            <div class="fact">
              <span class="fact__label">Encadrant</span>
              <span class="fact__value">${esc(e.supervisor)}</span>
            </div>
            ${e.docs
              .map(
                (d) =>
                  `<div class="fact">
              <span class="fact__label">Justificatif</span>
              <a class="fact__value" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(
                    d.label
                  )} ↓</a>
            </div>`
              )
              .join('\n            ')}
          </div>
          <span class="exp__missions-label">Missions réalisées</span>
          <div class="exp__missions">
            ${e.missions
              .map(
                (m, k) => `<div class="mission">
              <span class="mission__num">${k + 1}</span>
              <div class="mission__body">
                <h4><button class="mission__trigger" type="button" data-mission="${offset + k}"
                            aria-haspopup="dialog">${esc(m.title)}</button></h4>
                <p>${esc(m.summary)}</p>
                <span class="mission__more">détail de la mission →</span>
              </div>
            </div>`
              )
              .join('\n            ')}
          </div>
        </article>`;

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

/** Entrée de la rubrique cybersécurité. L'état est affiché tel quel. */
const cyberCard = (c) => {
  const done = c.state === 'obtenue';
  return `
        <div class="cyber${done ? '' : ' cyber--todo'}">
          <div class="cyber__head">
            <span class="cyber__state">${done ? '✓ obtenue' : 'à suivre'}</span>
            <span class="cyber__org">${esc(c.org)}</span>
          </div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.description)}</p>
          ${
            done
              ? `<div class="cyber__links">
            ${c.date ? `<span class="cyber__date">${esc(c.date)}</span>` : ''}
            ${
              c.pdf
                ? `<a href="${esc(c.pdf)}" target="_blank" rel="noopener">attestation PDF →</a>`
                : ''
            }
            ${
              c.verifyUrl
                ? `<a href="${esc(c.verifyUrl)}" target="_blank" rel="noopener">vérifier →</a>`
                : ''
            }
          </div>`
              : ''
          }
        </div>`;
};

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

/** Liens de pied de page, communs à toutes les pages. */
const legalNav = (prefix = '') =>
  LEGAL.map(
    (l) => `<a href="${prefix}${esc(l.slug)}.html">${esc(l.title)}</a>`
  ).join('\n          ');

const siteFoot = () => `
      <div class="foot">
        <div class="foot__legal">
          ${legalNav()}
        </div>
        <div class="foot__sign">
          <span>${esc(PROFILE.name)} — BTS SIO SISR</span>
          <span>${new Date().getFullYear()}</span>
        </div>
      </div>`;

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
      name: 'Alternance en administration réseau et systèmes (Var, Marseille)',
    },
  },
  null,
  2
);

/* --- Document principal -------------------------------------------------- */

const featured = VEILLE.slice(0, 3);
const more = VEILLE.slice(3);

const cyberDone = CYBER.filter((c) => c.state === 'obtenue').length;

const description =
  "Portfolio de Haitem Bejaoui, étudiant en BTS SIO option SISR : réalisations en centre de formation et en entreprise, veille technologique, cybersécurité et documents. Recherche une alternance dans le Var et à Marseille.";

/** En-tête commun à l'accueil et aux pages légales. */
const head = (title, desc, canonical) => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Haitem Bejaoui">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="${THEME_BG}">
<meta name="robots" content="index, follow">

<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="favicon.svg">

<link rel="preload" as="font" type="font/woff2" href="fonts/space-grotesk-latin-500-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="fonts/space-grotesk-latin-400-normal.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="fonts/jetbrains-mono-latin-400-normal.woff2" crossorigin>
<link rel="stylesheet" href="styles.css">`;

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
${head(
  `${esc(PROFILE.name)} — Portfolio BTS SIO SISR | Réseaux &amp; systèmes`,
  description,
  `${SITE}/`
)}

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

    <section class="section section--first" id="accueil" aria-labelledby="accueil-title">
      <header class="hero">
        <span class="hero__kicker">Portfolio · Réseaux &amp; systèmes</span>
        <h1 id="accueil-title">${esc(PROFILE.headline)}</h1>
        <p>${esc(PROFILE.intro)}</p>
        <div class="hero__status">
          <span class="dot"></span>
          <span>${ord(PROFILE.status)}</span>
        </div>
      </header>

      <div class="ident">
        <div class="ident__card">
          <span class="ident__label">Moi</span>
          <p>${esc(PROFILE.motivations.paragraphs[0])}</p>
        </div>
        <div class="ident__card">
          <span class="ident__label">École</span>
          <p>My Cyber School, La Valette-du-Var. ${ord(PROFILE.year)} de BTS Services
             Informatiques aux Organisations.</p>
        </div>
        <div class="ident__card">
          <span class="ident__label">Option</span>
          <p>SISR — Solutions d’Infrastructure, Systèmes et Réseaux. Administration,
             sécurisation et maintien en condition opérationnelle.</p>
        </div>
        <div class="ident__card ident__card--accent">
          <span class="ident__label">Alternance</span>
          <p>${esc(PROFILE.motivations.objective)}</p>
          <a class="ident__cv" href="${esc(PROFILE.cv)}" target="_blank" rel="noopener">
            Consulter mon CV ↓</a>
        </div>
      </div>

      <div class="bars">
        <span class="bars__label">Barres de compétences</span>
        <div class="bars__grid">${PROFILE.skillBars.map(skillBar).join('')}
        </div>
      </div>
    </section>

    <section class="section" id="competences" aria-labelledby="competences-title">
      <div class="section__head">
        <h2 id="competences-title"><span class="section__num">02</span>Compétences BTS SIO</h2>
        <span class="section__meta">tableau de synthèse · bloc 1</span>
      </div>
      <div class="col-2">
        <div class="prose">
          <p>Le tableau de synthèse des réalisations professionnelles récapitule, pour
             chaque réalisation, les compétences du référentiel BTS SIO mises en œuvre :
             gérer le patrimoine informatique, répondre aux incidents et aux demandes
             d’assistance, développer la présence en ligne de l’organisation, travailler
             en mode projet, mettre à disposition des utilisateurs un service informatique
             et organiser son développement professionnel.</p>
          <p>Il couvre les réalisations conduites en centre de formation comme celles
             menées en milieu professionnel, et sert de support à l’épreuve E4.</p>
        </div>
        <div class="panel-stack">
          <a class="box box--filled box--link" href="documents/tableau-synthese-e4.pdf"
             target="_blank" rel="noopener">
            <span class="box__label box__label--accent">Document</span>
            <span class="box__line">Tableau de synthèse des réalisations professionnelles ↓</span>
          </a>
          <div class="box">
            <span class="box__label">Ce qui me motive</span>
            ${PROFILE.motivations.drivers
              .map((d, i) =>
                i === 0
                  ? `<span class="box__line">${esc(d)}</span>`
                  : `<div class="box__rule"></div><span class="box__line">${esc(d)}</span>`
              )
              .join('\n            ')}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="centre" aria-labelledby="centre-title">
      <div class="section__head">
        <h2 id="centre-title"><span class="section__num">03</span>Réalisations en centre</h2>
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

    <section class="section" id="entreprise" aria-labelledby="entreprise-title">
      <div class="section__head">
        <h2 id="entreprise-title"><span class="section__num">04</span>Réalisations en entreprise</h2>
        <span class="section__meta">${MISSIONS.length} missions · ${ENTREPRISE.length} expérience${
  ENTREPRISE.length > 1 ? 's' : ''
}</span>
      </div>
      <div class="exps">${ENTREPRISE.map((e, i) =>
        entrepriseBlock(
          e,
          ENTREPRISE.slice(0, i).reduce((n, x) => n + x.missions.length, 0)
        )
      ).join('')}
      </div>
    </section>

    <section class="section" id="veille" aria-labelledby="veille-title">
      <div class="section__head">
        <h2 id="veille-title"><span class="section__num">05</span>Veille technologique</h2>
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
        <aside class="veille__aside" aria-label="Méthode, outils et sources de veille">
          <div class="box">
            <span class="box__label">Méthode</span>
            <span class="box__line">${esc(PROFILE.veilleMethod)}</span>
          </div>
          <div class="box">
            <span class="box__label">Outils de collecte</span>
            ${PROFILE.veilleTools
              .map(
                (t, i) =>
                  `${i ? '<div class="box__rule"></div>' : ''}<span class="tool">
              <span class="tool__name">${
                t.url
                  ? `<a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(
                      t.name
                    )} →</a>`
                  : esc(t.name)
              }</span>
              <span class="tool__role">${esc(t.role)}</span>
            </span>`
              )
              .join('\n            ')}
          </div>
          <div class="box">
            <span class="box__label">Sources suivies</span>
            <span class="box__line">${esc(PROFILE.veilleSources.join(' · '))}</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section" id="cybersecurite" aria-labelledby="cybersecurite-title">
      <div class="section__head">
        <h2 id="cybersecurite-title"><span class="section__num">06</span>Cybersécurité</h2>
        <span class="section__meta">${cyberDone} obtenue${cyberDone > 1 ? 's' : ''} · ${
  CYBER.length - cyberDone
} à suivre</span>
      </div>
      <div class="grid-auto">${CYBER.map(cyberCard).join('')}
      </div>
      <div class="grid-auto grid-auto--certs">${CERTIFICATIONS.map(certCard).join('')}
      </div>
    </section>

    <section class="section section--tight" id="documents" aria-labelledby="documents-title">
      <div class="section__head">
        <h2 id="documents-title"><span class="section__num">07</span>Documents</h2>
        <span class="section__meta">CV · synthèse E4 · attestations</span>
      </div>
      <div class="docs">${DOCUMENTS.map(docRow).join('')}
      </div>
    </section>

    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="section__head">
        <h2 id="contact-title"><span class="section__num">08</span>Contact</h2>
      </div>
      <div class="contact">
        <div class="contact__left">
          <p>Je cherche une alternance en réseaux et systèmes pour ma deuxième année, dans le Var, à Marseille et alentours.</p>
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
${siteFoot()}
    </section>

  </main>
</div>
${DATA.map(projectPanel).join('')}
${MISSIONS.map(missionPanel).join('')}
${VEILLE.map(veillePanel).join('')}

<script src="app.js" defer></script>
</body>
</html>
`;

/* --- Pages légales ------------------------------------------------------- */

const legalHtml = (l) => `<!DOCTYPE html>
<html lang="fr">
<head>
${head(
  `${esc(l.title)} — ${esc(PROFILE.name)}`,
  l.intro,
  `${SITE}/${l.slug}.html`
)}
<meta name="robots" content="index, nofollow">
</head>
<body class="is-legal">

<header class="topbar">
  <a class="topbar__back" href="index.html">← portfolio</a>
  <span class="topbar__name">${esc(PROFILE.name)}</span>
  <a class="topbar__cv" href="${esc(PROFILE.cv)}" target="_blank" rel="noopener">CV</a>
</header>

<main class="legal">
  <header class="legal__head">
    <span class="legal__kicker">Informations légales</span>
    <h1>${esc(l.title)}</h1>
    <p class="legal__intro">${esc(l.intro)}</p>
  </header>

  ${l.blocks
    .map(
      (b) => `<section class="legal__block">
    <h2>${esc(b.heading)}</h2>
    ${b.paras.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
  </section>`
    )
    .join('\n  ')}

  <div class="foot">
    <div class="foot__legal">
      ${legalNav()}
    </div>
    <div class="foot__sign">
      <span><a href="index.html">Retour au portfolio</a></span>
      <span>${new Date().getFullYear()}</span>
    </div>
  </div>
</main>

</body>
</html>
`;

/* --- Fichiers annexes ---------------------------------------------------- */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="${THEME_A}"/>
  <text x="32" y="43" font-family="ui-monospace, monospace" font-size="30"
        font-weight="500" fill="#ffffff" text-anchor="middle">HB</text>
</svg>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${LEGAL.map(
  (l) => `  <url>
    <loc>${SITE}/${l.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>`
).join('\n')}
</urlset>
`;

/* Les gabarits laissent des espaces en fin de ligne : on nettoie. */
const clean = (s) =>
  s
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n');

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), clean(html));
for (const l of LEGAL) {
  fs.writeFileSync(path.join(OUT, `${l.slug}.html`), clean(legalHtml(l)));
}
fs.writeFileSync(path.join(OUT, 'favicon.svg'), favicon);
fs.writeFileSync(path.join(OUT, 'robots.txt'), robots);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);

console.log(
  `index.html généré (${(html.length / 1024).toFixed(1)} Ko) — ${DATA.length} projets en centre, ${
    MISSIONS.length
  } missions en entreprise, ${VEILLE.length} veilles, ${CYBER.length} entrées cyber, ${
    DOCUMENTS.length
  } documents, ${LEGAL.length} pages légales.`
);
