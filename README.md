# Portfolio — BEJAOUI HAITEM (BTS SIO SISR)

Site statique, sans framework. Le contenu vit dans un seul fichier de données ;
un petit script Node fabrique la page. Rien à apprendre pour le faire évoluer.

## Comment ça marche

```
src/data.js          ← tout le contenu (projets, veilles, documents, profil)
build.js             ← fabrique public/index.html à partir de src/data.js
public/              ← le site publié
  index.html         ← généré, ne pas modifier à la main
  styles.css         ← les styles
  app.js             ← les interactions (panneaux, filtres, menu)
  assets/            ← images optimisées et servies
  documents/         ← les PDF téléchargeables
  fonts/             ← Space Grotesk et JetBrains Mono
originaux/assets/    ← les images d'origine, non compressées, conservées ici
```

Le texte des projets et des veilles est écrit dans `public/index.html` par le
script. C'est ce qui permet à Google de lire le contenu : le JavaScript ne sert
qu'à ouvrir et fermer les panneaux.

## Ajouter un projet ou une veille

1. Ouvrir `src/data.js`.
2. Copier un bloc existant et remplacer le texte. Pour un projet, déposer
   l'image dans `originaux/assets/` puis dans `public/assets/`.
3. Lancer `npm run build`.
4. Commiter et pousser : Vercel publie tout seul.

Les compteurs (« 2 projets », « 5 veilles ») se recalculent seuls.

## Commandes

| Commande | Effet |
| --- | --- |
| `npm run build` | régénère `public/index.html` |
| `npm run dev` | régénère et ouvre le site en local sur le port 4321 |
| `npm run check` | régénère et valide le HTML |
| `npm run images` | réoptimise les images depuis `originaux/assets/` |

`npm install` n'est nécessaire que pour `check` et `images`. La génération de la
page ne dépend d'aucun paquet.

## Publication

Hébergé sur Vercel. À chaque `git push`, Vercel exécute `node build.js` et publie
le dossier `public/` (voir `vercel.json`).

L'adresse du site est définie une seule fois, en haut de `build.js` :

```js
const SITE = process.env.SITE_URL || 'https://bejaoui-haitem.vercel.app';
```

Elle alimente le lien canonique, l'aperçu de partage et le `sitemap.xml`. Si le
domaine change, c'est la seule ligne à modifier.

## Choix techniques

- **Pas de framework.** Une page, du contenu statique : du HTML généré suffit et
  le site pèse moins de 400 Ko au total.
- **Polices auto-hébergées.** Aucune requête vers Google Fonts, donc aucune
  adresse IP de visiteur transmise à un tiers, et un affichage plus rapide.
- **Images optimisées.** Les originaux sont conservés dans `originaux/assets/` ;
  `public/assets/` contient les versions servies (3,2 Mo → 242 Ko).
- **Accessibilité.** Navigation au clavier complète, panneaux avec piège de
  focus et fermeture par Échap, aucune cible tactile sous 44 px sur mobile.

Le design suit le handoff `design_handoff_portfolio_sisr` : thème anthracite et
vert terminal, Space Grotesk et JetBrains Mono. Ne pas éclaircir le thème ni
ajouter une seconde couleur d'accent.
