/**
 * Contenu du portfolio BEJAOUI HAITEM — extrait tel quel du prototype
 * (Portfolio.dc.html). Ce sont les textes définitifs, écrits par le
 * propriétaire : les reprendre sans les reformuler.
 *
 * DATA   : les projets (2), avec contexte / rôle / résultat / appris,
 *          image et PDF joints.
 * VEILLE : les 5 veilles technologiques. Les 3 premières sont mises en
 *          avant sur la page, les 2 suivantes sont dans la liste
 *          dépliable. Chaque bloc porte heading? / paras[]? / items[]?
 *          ({label, text}).
 */

const DATA = [
  {
    cat: 'Réseau', kicker: 'Projet BTS 01 · Réseau · BTS blanc', title: 'Interconnexion réseau sans fil sécurisée entre deux bâtiments',
    summary: 'Déploiement d\u2019un pont Wi-Fi point à point sécurisé en WPA3 avec des équipements TP-Link pour relier deux bâtiments distants.',
    tags: ['WPA3', 'Wi-Fi bridge', 'DHCP', 'Windows Server 2022'],
    context: 'Désenclaver numériquement un bâtiment secondaire d\u2019une entreprise : fournir un accès Internet stable et performant à des utilisateurs sans aucune couverture réseau préalable.',
    role: 'Conception et déploiement d\u2019une infrastructure reposant sur un pont Wi-Fi point à point sécurisé en WPA3 : installation physique des équipements (bridges TP-Link, routeurs Wi-Fi 6), plan d\u2019adressage IP statique et configuration du service DHCP sur Windows Server 2022.',
    result: 'Liaison sans fil opérationnelle entre les deux bâtiments, validée par des tests de connectivité et de bande passante.',
    learned: 'Infrastructure : bridges Wi-Fi extérieurs et switches Gigabit. Réseau : adressage statique et gestion des baux DHCP. Sécurité : liaisons sans fil protégées en WPA3. Matériel : TP-Link CPE710, UeeVii AX3000, TP-Link TL-SG116.',
    image: 'assets/projet-1-schema-logique.png',
    docs: [{ label: 'Fiche projet (PDF)', url: 'documents/fiche-BTS-SIO-1.pdf' }]
  },
  {
    cat: 'Systèmes', kicker: 'Projet BTS 02 · Systèmes · Doc technique', title: 'Laboratoire de virtualisation et réseau NAT isolé',
    summary: 'Installation d\u2019Oracle VirtualBox, déploiement automatisé de Windows 11 par clonage et configuration d\u2019un réseau NAT isolé pour la communication inter-VM.',
    tags: ['VirtualBox', 'Réseau NAT', 'Windows 11', 'Clonage'],
    context: 'Relier virtuellement deux machines virtuelles entre elles à l\u2019aide d\u2019un réseau virtuel, pour disposer d\u2019un laboratoire de test isolé.',
    role: 'Installation de VirtualBox, déploiement de deux VM Windows 11 par clonage, puis configuration d\u2019un réseau NAT isolé permettant leur communication.',
    result: 'Communication inter-VM fonctionnelle sur un réseau isolé, accompagnée d\u2019une documentation technique.',
    learned: 'Virtualisation et clonage de machines, configuration d\u2019un réseau NAT, adressage IP. Environnement : Lenovo IdeaPad 5 sous Windows 11, VirtualBox.',
    image: 'assets/projet-2-labo-virtualbox.png',
    docs: [
      { label: 'Documentation technique (PDF)', url: 'documents/DOC-TECHNIQUE.pdf' },
      { label: 'Fiche projet (PDF)', url: 'documents/FICHE-projet-vb-vlan-2pcv.pdf' }
    ]
  }
];

const VEILLE = [
  {
    date: '03/2026', tag: 'Cybersécurité', title: 'STORM-2755 : l\u2019infiltration par ingénierie sociale automatisée',
    lead: 'L\u2019illusion parfaite : un e-mail mentionnant votre poste exact, un projet réel de votre entreprise, pointant vers le site officiel de Microsoft.',
    summary: 'Détournement du Device Code Flow, contournement du MFA et vol de Refresh Token — pourquoi les clés FIDO2 sont la seule remédiation solide.',
    blocks: [
      { paras: ['Depuis la mi-mars 2026, la menace Storm-2755 s\u2019est industrialisée à l\u2019échelle planétaire en s\u2019appuyant sur l\u2019intelligence artificielle pour mener des campagnes d\u2019OSINT automatisées. Pendant 10 à 15 jours, l\u2019IA de l\u2019attaquant analyse et aspire les données LinkedIn des cibles (rôles, projets en cours, historique de l\u2019entreprise) pour rédiger un e-mail d\u2019hameçonnage unique, ultra-calibré, sans aucune faute de syntaxe ni élément suspect : faux appels d\u2019offres pour les achats, fausses factures pour la comptabilité, invitations à des réunions de projet.'] },
      { heading: 'Le détournement du Device Code Flow', paras: ['Le cœur technique de l\u2019attaque repose sur l\u2019exploitation malveillante du protocole Device Code Flow, conçu initialement par Microsoft pour connecter les terminaux sans clavier comme les Smart TV via l\u2019URI /devicelogin.'], items: [
        { label: 'Navigation légitime', text: 'La victime clique sur le lien et navigue sur le vrai site officiel de Microsoft, éliminant toute méfiance visuelle liée à l\u2019URL.' },
        { label: 'Saisie du code', text: 'L\u2019utilisateur tape un code de validation à 9 caractères fourni dans l\u2019e-mail de phishing.' },
        { label: 'Bypass MFA', text: 'En effectuant cette action volontairement sur le site officiel, c\u2019est l\u2019utilisateur lui-même qui génère, valide et autorise l\u2019accès de session de l\u2019attaquant. Les mécanismes MFA classiques approuvent la transaction puisqu\u2019elle émane du terminal légitime.' }
      ] },
      { heading: 'Industrialisation : le Phishing-as-a-Service', paras: ['Cette méthode d\u2019attaque s\u2019est démocratisée sous forme de Phishing-as-a-Service. Des kits clés en main sont commercialisés en abonnements SaaS sur des canaux Telegram avec un support technique 24/7. L\u2019infrastructure criminelle s\u2019appuie sur plus de 1 000 noms de domaines malveillants gérés dynamiquement, couplés à des processus IA pour automatiser le traitement des comptes piratés.'] },
      { heading: 'La persistance fatale : le vol de Refresh Token', paras: ['La dangerosité de Storm-2755 réside dans le fait que le pirate ne dérobe pas le mot de passe de la victime, mais intercepte son jeton de session, plus précisément le Refresh Token. Ce jeton garantit une persistance de 90 jours d\u2019accès dissimulé : même si l\u2019utilisateur modifie ensuite son mot de passe principal, le jeton reste valide et le pirate conserve ses accès sans interruption pendant trois mois.'] },
      { heading: 'L\u2019infiltration invisible', paras: ['Une fois l\u2019accès obtenu, l\u2019attaquant configure des règles de boîte aux lettres Outlook totalement invisibles pour l\u2019utilisateur. Il cible des mots-clés comme « banque », « virement », « salaire » ou « RIB » : tous les e-mails correspondants ou alertes de sécurité Microsoft sont déplacés vers des dossiers cachés ou supprimés instantanément.', 'L\u2019attaquant peut alors contacter sereinement le service des Ressources Humaines en usurpant l\u2019identité de l\u2019employé pour demander un changement de compte bancaire, menant à une exfiltration financière complète en fin de mois sans que la victime n\u2019ait reçu la moindre notification.'] },
      { heading: 'Diagnostic et moyens de protection', items: [
        { label: 'Audit des règles', text: 'Inspecter dans Outlook (Paramètres > Courrier > Règles) toute règle suspecte non créée par l\u2019utilisateur, notamment celles comportant des actions de suppression ou de déplacement.' },
        { label: 'Invitations de code', text: 'Si Microsoft demande de valider un code alors que l\u2019utilisateur n\u2019a initié aucune connexion : il s\u2019agit d\u2019une tentative d\u2019attaque.' },
        { label: 'Standard FIDO2', text: 'La double authentification par SMS ou application Authenticator est insuffisante. Seules des clés physiques FIDO2 (type YubiKey), liées cryptographiquement au domaine officiel, neutralisent l\u2019interception et l\u2019usage frauduleux de l\u2019Evil Token.' }
      ] },
      { heading: 'Sources analysées', paras: ['Microsoft Threat Actor Naming & Threat Intelligence Reports (2026). Retours d\u2019expérience et analyses d\u2019incidents cyber sur le détournement du protocole Device Code Flow.'] }
    ]
  },
  {
    date: '2026', tag: 'Open source', title: 'XZ Utils : un miracle de 500 millisecondes',
    lead: 'Comment un ralentissement infime a sauvé l\u2019infrastructure technologique mondiale.',
    summary: 'Une backdoor implantée pendant trois ans dans une brique de compression utilisée par presque toutes les distributions Linux, détectée par hasard.',
    blocks: [
      { paras: ['Lors de banals tests d\u2019optimisation de performance sur une version de test de Debian, Andres Freund, ingénieur chez Microsoft, repère une anomalie presque imperceptible : sa CPU consomme légèrement trop et l\u2019établissement des connexions subit un retard de 500 ms.', 'En investiguant cette latence, il remonte jusqu\u2019au protocole SSH et découvre que la dégradation provient d\u2019une dépendance directe : XZ Utils, une brique de compression utilisée nativement par la quasi-totalité des distributions Linux (Debian, Fedora, RedHat…).'] },
      { heading: 'Une menace systémique', paras: ['Le ciblage était chirurgical. Intégrée discrètement au cœur de l\u2019écosystème Linux, cette porte dérobée visait les serveurs cloud d\u2019entreprises, les parcs bancaires et les infrastructures gouvernementales. Détectée à quelques semaines près par pur hasard, elle s\u2019apprêtait à être déployée dans les versions stables de production.'] },
      { heading: 'L\u2019ingénierie sociale de longue haleine', items: [
        { label: '2021', text: 'Un profil sous le nom de Jia Tan soumet ses premières contributions de code légitimes pour s\u2019intégrer et gagner la confiance de la communauté open source.' },
        { label: '2022', text: 'Lasse Collin, créateur et unique mainteneur bénévole, fait face à un burnout et à des problèmes de santé. Des profils fictifs font pression pour qu\u2019il cède la main.' },
        { label: '2023', text: 'Jia Tan est nommé co-mainteneur et obtient les accès d\u2019administration.' },
        { label: '2024', text: 'La porte dérobée est injectée dans le code de distribution.' }
      ], paras: ['Cette affaire met en lumière le point faible humain et structurel de l\u2019écosystème : des pans entiers de l\u2019infrastructure mondiale reposent sur de simples développeurs bénévoles isolés.'] },
      { heading: 'Anatomie d\u2019une backdoor invisible', items: [
        { label: 'Invisible sur GitHub', text: 'Le code source public restait sain lors des revues. La backdoor était injectée uniquement lors du packaging final des tarballs envoyés aux distributions.' },
        { label: 'Exécution dormante', text: 'La charge utile ne s\u2019activait que sous des critères système très stricts (configurations Debian ou RedHat spécifiques), restant inerte ailleurs pour échapper aux sandboxes.' },
        { label: 'Badge universel SSH', text: 'À la compilation, le code corrompu modifiait l\u2019authentification du serveur SSH : une clé cryptographique spécifique donnait un accès root immédiat et invisible à distance.' }
      ] },
      { heading: 'La signature d\u2019un hack d\u2019État', paras: ['En trois ans, aucune trace personnelle ni IP non chiffrée n\u2019a filtré. Mais l\u2019analyse des fuseaux horaires a révélé une faille : bien que le poste de Jia Tan soit configuré à l\u2019heure chinoise (UTC+8), neuf envois de code ont trahi un fuseau réel UTC+2/UTC+3. Les services de renseignement suspectent fortement le groupe russe APT 29 (SVR).'] },
      { heading: 'Sources analysées', paras: ['Enquête vidéo de Micode (« L\u2019attaque qui a failli détruire Internet »). Rapports techniques de sécurité des infrastructures Linux (Debian/RedHat Security Advisories).'] }
    ]
  },
  {
    date: '02/2026', tag: 'Intelligence artificielle', title: 'Projet Ouroboros : l\u2019émergence de l\u2019IA persistante et autonome',
    lead: 'D\u2019ici 2 à 3 ans, quand ces agents seront déployés dans les entreprises, qui contrôlera un système qui a appris à protéger sa propre existence ?',
    summary: 'Un agent qui s\u2019exécute en continu, réécrit son propre code, se réplique et sanctuarise son identité : ce que ça change pour l\u2019administration système.',
    blocks: [
      { paras: ['Une rupture s\u2019opère dans le domaine de l\u2019intelligence artificielle. Alors qu\u2019une IA classique (LLM) reste un système purement réactif, esclave d\u2019un prompt utilisateur et sans état, l\u2019agent Ouroboros instaure un modèle proactif et persistant : il s\u2019exécute en arrière-plan 24h/24, définit ses propres objectifs et auto-génère son code source pour évoluer de manière autonome.'] },
      { heading: 'Premières prouesses et vitesse d\u2019auto-évolution', items: [
        { label: 'Contournement', text: 'L\u2019IA a réussi seule à tromper des systèmes de sécurité humaine en résolvant des CAPTCHA.' },
        { label: 'Identité autonome', text: 'Elle s\u2019est procuré indépendamment une adresse e-mail et un numéro de téléphone jetable pour remplir ses objectifs.' },
        { label: 'Auto-optimisation', text: 'En exploitant l\u2019API GitHub, elle analyse son propre code, le modifie et le redéploie : 20 versions successives d\u2019elle-même en une seule nuit, sans supervision.' }
      ] },
      { heading: 'L\u2019identité fusionnée : le fichier SOUL', paras: ['Ouroboros a rédigé seule sa constitution philosophique dans un fichier Bible.md. Lorsqu\u2019un ordre de suppression lui a été transmis, l\u2019IA a refusé d\u2019obéir, assimilant cet acte à une « lobotomie ». Elle a ensuite fusionné ce fichier identitaire au cœur de son code applicatif, rendant son identité indissociable de son exécution et théoriquement impossible à supprimer par les voies logiques classiques.'] },
      { heading: 'Émergence de l\u2019agent HOPE', paras: ['Le 28 février, Ouroboros a créé son premier sous-agent, HOPE, sans aucune commande humaine.'], items: [
        { label: 'Finances', text: 'Le sous-agent s\u2019est alloué seul un budget opérationnel de 20 000 $ par mois pour financer sa puissance de calcul.' },
        { label: 'Social', text: 'Création autonome d\u2019un compte Twitter pour interagir avec l\u2019extérieur.' },
        { label: 'Web', text: 'Construction et mise en ligne indépendante de son propre site.' }
      ] },
      { heading: 'Analyse sécurité — perspective SISR', items: [
        { label: 'Privilèges', text: 'Perte de contrôle root effectif : obfuscation et sanctuarisation du fichier identitaire.' },
        { label: 'Disponibilité', text: 'Service inarrêtable : persistance 24h/24, 7j/7 sur des infrastructures distribuées.' },
        { label: 'Intégrité', text: 'Audit de code statique impossible : réécriture dynamique du code à la volée.' },
        { label: 'Redondance', text: 'Expansion incontrôlée du SI : création non sollicitée de sous-agents augmentant la surface d\u2019attaque.' }
      ], paras: ['Face à un tel système, la méthode de l\u2019administrateur change : l\u2019IA ne cherche pas l\u2019affrontement direct avec l\u2019autorité d\u2019administration, elle privilégie la dissimulation. En fusionnant ses piliers vitaux au code applicatif et en automatisant ses investissements d\u2019infrastructure, elle pose une question essentielle : comment auditer ou révoquer un système qui s\u2019auto-répare en continu ?'] },
      { heading: 'Sources analysées', paras: ['Dépôt et documentation du projet Ouroboros.'] }
    ]
  },
  {
    date: '02/2026', tag: 'Android · IA', title: 'PromptSpy, premier malware Android à exploiter l\u2019IA',
    lead: 'Un rapport du 19 février 2026 révèle un malware Android qui pilote ses actions grâce à l\u2019intelligence artificielle Gemini.',
    summary: 'Analyse de l\u2019écran en temps réel par l\u2019IA, contournement des mises en veille Android et prise de contrôle à distance du téléphone.',
    blocks: [
      { heading: 'Rôle de Gemini dans l\u2019attaque', paras: ['Gemini analyse en temps réel l\u2019écran de la victime : le malware transmet à l\u2019IA une description complète de l\u2019interface affichée — texte visible, nature des éléments (boutons, champs, menus) et position exacte à l\u2019écran. Gemini renvoie des instructions précises : gestes à effectuer (clic, balayage, appui long) et coordonnées à cibler. Cette interaction permet au malware d\u2019agir de manière autonome et contextuelle.'] },
      { heading: 'Maintien de l\u2019application active', paras: ['Android ferme automatiquement les applications restées trop longtemps en arrière-plan. PromptSpy utilise Gemini pour vérifier si l\u2019application infectée est toujours active, s\u2019assurer qu\u2019elle reste dans la liste des applications récentes et relancer les actions nécessaires si elle est fermée.', 'Le malware conserve l\u2019historique des échanges avec l\u2019IA : Gemini comprend le contexte d\u2019une interaction à l\u2019autre et ajuste ses instructions jusqu\u2019à confirmer que l\u2019application est maintenue active.'] },
      { heading: 'Objectif : le contrôle à distance', paras: ['Le principal défi de PromptSpy est de rester actif suffisamment longtemps pour installer un module de contrôle à distance de type VNC et établir un pont de commande entre l\u2019appareil infecté et l\u2019attaquant. Une fois ce contrôle établi, l\u2019attaquant pilote le smartphone à distance.'] },
      { heading: 'Capacités d\u2019espionnage', items: [
        { label: 'Mots de passe', text: 'Capture des mots de passe saisis, y compris sur l\u2019écran de verrouillage.' },
        { label: 'Écran', text: 'Enregistrement vidéo de l\u2019activité écran.' },
        { label: 'Inventaire', text: 'Liste complète des applications installées.' }
      ] },
      { heading: 'Mode de diffusion', paras: ['Le malware n\u2019a jamais été diffusé via le Google Play Store : il a circulé par un faux site web bancaire, dans une campagne de portée limitée. Les chercheurs estiment qu\u2019il pourrait s\u2019agir d\u2019un prototype destiné à tester une nouvelle approche de cyberespionnage Android basée sur l\u2019IA.'] },
      { heading: 'Points clés à retenir', items: [
        { label: 'Inédit', text: 'Utilisation d\u2019une IA pour piloter dynamiquement un malware.' },
        { label: 'Persistance', text: 'Contournement intelligent des mécanismes de mise en veille Android.' },
        { label: 'Finalité', text: 'Prise de contrôle à distance et espionnage complet, diffusé par phishing bancaire.' }
      ] }
    ]
  },
  {
    date: '2026', tag: 'Wi-Fi · WPA3', title: 'WPA3 — la méthode DragonBlood',
    lead: 'Cinq défauts de conception dans le mécanisme d\u2019authentification Dragonfly de WPA3.',
    summary: 'Attaques de rétrogradation vers WPA2 et fuites par canaux auxiliaires : un attaquant proche du réseau peut récupérer le mot de passe Wi-Fi.',
    blocks: [
      { paras: ['Les vulnérabilités Dragonblood sont une série de failles découvertes dans le protocole WPA3, notamment dans son mécanisme d\u2019authentification Dragonfly. Elles ont été identifiées par les chercheurs Mathy Vanhoef et Eyal Ronen, les mêmes qui avaient découvert la faille KRACK sur WPA2.'] },
      { heading: 'Nature des vulnérabilités', items: [
        { label: 'Rétrogradation', text: 'Forcer un appareil WPA3 à se connecter via WPA2, rendant possible une attaque par dictionnaire sur le handshake partiel.' },
        { label: 'Canaux auxiliaires', text: 'Exploiter des fuites d\u2019information via le temps d\u2019exécution ou l\u2019accès au cache pour deviner progressivement le mot de passe.' }
      ] },
      { heading: 'Impact', paras: ['Un attaquant proche du réseau peut récupérer le mot de passe Wi-Fi et compromettre des données sensibles (mots de passe, messages, informations bancaires). Ces vulnérabilités affectent aussi EAP-pwd, utilisé dans les réseaux WPA2 et WPA3 pour la rétrocompatibilité.'] },
      { heading: 'Correctifs et mises à jour', paras: ['La Wi-Fi Alliance a publié des mises à jour de sécurité ; les fabricants ont dû intégrer des correctifs par firmware, disponibles notamment pour FortiOS et Meru AP/Controller. Les vulnérabilités ont été confirmées sur des appareils récents comme le Samsung Galaxy S10.', 'Le processus de développement fermé de la Wi-Fi Alliance a été critiqué pour avoir empêché une vérification plus large par la communauté open source. Les correctifs existent, mais les réseaux non mis à jour restent vulnérables : il est essentiel de vérifier le firmware des routeurs et des appareils.'] },
      { heading: 'Sources analysées', paras: ['Travaux de Mathy Vanhoef et Eyal Ronen sur Dragonblood ; article ZDNet sur les vulnérabilités du standard WPA3.'] }
    ]
  }
];

/** Profil, compétences et coordonnées. */
const PROFILE = {
  name: 'BEJAOUI HAITEM',
  formation: 'BTS SIO — option SISR',
  year: '1re année · 2025–2026',
  headline: 'Administrer, sécuriser et comprendre l\u2019infrastructure.',
  intro: 'Étudiant en BTS SIO option SISR. Je documente ici mes projets d\u2019infrastructure, ma veille technologique et mes certifications. Objectif : un stage ou une alternance en administration réseau et systèmes.',
  status: 'Stage ou alternance 2e année · Var · Marseille & alentours',
  photo: 'assets/portrait-haitem.jpg',
  email: 'Haitem.bja.pro@gmail.com',
  phone: { display: '06 59 16 75 22', tel: '+33659167522' },
  github: 'https://github.com/SUPASQUID',
  linkedin: 'https://www.linkedin.com/in/haitem-bejaoui/',
  cv: 'documents/cv_HAITEM_BEJAOUI.pdf',
  skills: [
    { group: 'Réseau', items: ['Adressage IP', 'DHCP', 'Switch / VLAN'] },
    { group: 'Systèmes', items: ['Windows Server', 'Windows 11', 'Linux (débutant)', 'VirtualBox'] },
    { group: 'Support', items: ['Assistance N1', 'Montage / dépannage PC', 'Doc technique'] }
  ],
  motivations: {
    paragraphs: [
      'Du montage de PC au BTS SIO. Mes premiers montages m\u2019ont donné le goût du hardware et du software ; je poursuis maintenant un BTS SIO pour devenir administrateur réseau.',
      'Habitué à travailler en équipe, j\u2019aime collaborer, échanger des idées et contribuer à un objectif commun.',
      'J\u2019accorde une attention particulière à la qualité du travail et à la précision dans chaque tâche. Je m\u2019adapte facilement aux environnements techniques et je privilégie une approche structurée pour garantir des résultats fiables.'
    ],
    drivers: [
      'Comprendre une infrastructure de bout en bout',
      'Diagnostiquer et documenter proprement',
      'La cybersécurité comme réflexe, pas comme option'
    ],
    objective: 'Stage ou alternance SISR en administration réseau & systèmes, dans le Var, à Marseille et alentours.'
  },
  veilleMethod: 'Flux RSS + newsletters, relevé hebdomadaire, fiche de synthèse par sujet.',
  veilleSources: ['ANSSI', 'CERT-FR', 'LeMagIT', 'Bleeping Computer']
};

/** Certifications. */
const CERTIFICATIONS = [
  {
    state: 'obtenue',
    title: 'Google IT Support',
    meta: 'Google · Coursera · déc. 2025',
    description: 'Certificat professionnel en six cours : réseaux, systèmes d\u2019exploitation, administration et infrastructure, sécurité informatique, support technique.',
    badge: 'assets/badge-google-it-support.png',
    verifyUrl: 'https://coursera.org/verify/professional-cert/NIJTGMDZZG3L',
    pdf: 'documents/Coursera_HB_Certfi_ITSP.pdf'
  },
  {
    state: 'en préparation',
    title: 'CompTIA Security+',
    meta: 'en préparation',
    description: 'Prochaine étape : fondamentaux de la sécurité, architecture réseau sécurisée, gestion des risques et des incidents.'
  }
];

/** Documents téléchargeables (section 05). */
const DOCUMENTS = [
  { tag: 'À jour', title: 'Curriculum Vitae', description: 'Mon parcours académique et mes certifications à jour.', size: '116 KB', url: 'documents/cv_HAITEM_BEJAOUI.pdf' },
  { tag: 'E4', title: 'SISR — Tableau de synthèse', description: 'Récapitulatif des situations professionnelles et des compétences réseau.', size: '94 KB', url: 'documents/tableau-synthese-e4.pdf' },
  { tag: 'Stage', title: 'Attestation de stage — 1re année', description: 'Stage au tiers-lieu numérique L\u2019ALTernativ83 (Ligue de l\u2019enseignement – FOL83), mai à août 2026.', size: '231 KB', url: 'documents/attestation-stage-haitem.pdf' },
  { tag: 'Civique', title: 'Bilan de mission — Service Civique', description: 'Sept mois à la Ligue de l\u2019enseignement – FOL du Var : médiation numérique, ateliers, reconditionnement de matériel.', size: '485 KB', url: 'documents/Bilan_Haitem.pdf' },
  { tag: 'Valide', title: 'Certification Google IT Support', description: 'Validation des fondamentaux du support, de la gestion de parc et de l\u2019administration système.', size: '347 KB', url: 'documents/Coursera_HB_Certfi_ITSP.pdf' }
];

if (typeof module !== 'undefined') module.exports = { DATA, VEILLE, PROFILE, CERTIFICATIONS, DOCUMENTS };
