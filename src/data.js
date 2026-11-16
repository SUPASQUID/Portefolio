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
    year: '1re année', cat: 'Réseau', kicker: 'Projet BTS 01 · Réseau · BTS blanc', title: 'Interconnexion réseau sans fil sécurisée entre deux bâtiments',
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
    year: '1re année', cat: 'Systèmes', kicker: 'Projet BTS 02 · Systèmes · Doc technique', title: 'Laboratoire de virtualisation et réseau NAT isolé',
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
  },
  {
    year: '2e année', cat: 'Systèmes', kicker: 'Projet BTS 03 · Systèmes · Hyperviseur', title: 'Administration d\u2019un hyperviseur Proxmox VE 9',
    summary: 'Cycle de vie complet d\u2019une machine virtuelle sur Proxmox VE 9, par l\u2019interface web puis en ligne de commande, avec ajustement des ressources et gestion des snapshots.',
    tags: ['Proxmox VE 9', 'KVM / QEMU', 'Snapshots LVM', 'Ligne de commande'],
    context: 'Provisionner rapidement un environnement de test sur un hyperviseur, puis en ajuster les ressources — d\u2019abord manuellement, ensuite de façon automatisable.',
    role: 'Création d\u2019une VM depuis l\u2019interface web, puis pilotage complet en ligne de commande avec qm : démarrage, arrêt, statut et configuration. Passage de la mémoire de 2 à 4 Gio, réduction du processeur à un cœur, création puis suppression d\u2019un snapshot LVM-thin.',
    result: 'Les douze critères de validation des trois exercices sont atteints. Six incidents rencontrés — dont un verrou de configuration et un arrêt ACPI resté sans effet — ont été diagnostiqués, expliqués et documentés.',
    learned: 'L\u2019interface web et la commande qm ne sont pas deux produits mais deux clients de la même API REST : les deux écrivent dans le même fichier, /etc/pve/qemu-server/101.conf. Une machine virtuelle tient en dix-neuf lignes de texte. Snapshots LVM-thin en copie sur écriture, allocation paresseuse de la mémoire et ballooning. La moitié des commandes de l\u2019énoncé n\u2019existaient pas dans le produit : retrouver les commandes réelles dans la documentation fait partie du travail d\u2019administration.',
    image: 'assets/projet-3-proxmox.png',
    docs: [
      { label: 'Compte-rendu de TP (PDF)', url: 'documents/TP01-compte-rendu.pdf' },
      { label: 'Documentation technique (PDF)', url: 'documents/TP01-documentation-technique.pdf' }
    ]
  }
];

/**
 * ENTREPRISE : réalisations en milieu professionnel.
 *
 * Les faits (dates, nom exact de la structure, encadrant) sont repris de
 * l’attestation de stage signée — public/documents/attestation-stage-haitem.pdf.
 * Ne pas les retoucher sans relire ce PDF : des dates fausses ont déjà
 * circulé dans les versions précédentes du dossier.
 *
 * Les chiffres sont volontairement modestes et vérifiables. Ne pas les
 * gonfler : ils doivent rester défendables à l’oral.
 */
const ENTREPRISE = [
  {
    year: '1re année',
    kind: 'Stage',
    org: 'Tiers-lieu numérique L’ALTernativ83',
    orgMeta: 'Ligue de l’enseignement – FOL 83 · Toulon (Var)',
    period: 'du 6 juillet au 7 août 2026',
    duration: '5 semaines',
    supervisor: 'Merlin HICKS, chargé de mission à l’engagement jeunesse',
    about:
      'L’ALTernativ83 est un tiers-lieu numérique porté par la Ligue de l’enseignement – FOL 83, association loi 1901. Sa mission : lutter contre la fracture numérique, en combinant la revalorisation de matériel informatique (économie circulaire) et l’accompagnement des publics fragiles vers l’autonomie numérique (e-inclusion).',
    missions: [
      {
        cat: 'Support',
        title: 'Revalorisation de postes informatiques',
        summary:
          'Remise en service d’ordinateurs usagés pour les bénéficiaires de l’association : diagnostic, réparation, effacement sécurisé des données et réinstallation du système.',
        tags: ['Diagnostic matériel', 'Windows / Linux', 'Effacement RGPD', 'Économie circulaire'],
        context:
          'L’association collecte des ordinateurs usagés et les remet en état pour les mettre à disposition de publics en précarité, à bas coût ou gratuitement. La démarche est double : réduire les déchets électroniques et rendre l’équipement accessible.',
        role:
          'Prise en charge d’un poste de bout en bout : réception et diagnostic matériel, nettoyage et renouvellement de la pâte thermique, remplacement des pièces défectueuses (SSD, RAM, ventilateurs), effacement sécurisé des données de l’ancien propriétaire dans le respect du RGPD, réinstallation de Windows ou d’une distribution Linux légère selon l’état de la machine, puis tests de stabilité avant remise en service.',
        result:
          'Quelques ordinateurs revalorisés et remis à disposition des bénéficiaires. Cas traités : poste bloqué au démarrage (réinstallation complète), portable en surchauffe (nettoyage et pâte thermique), SSD défaillant (diagnostic et remplacement), machine trop lente (passage sur Linux léger).',
        learned:
          'Un diagnostic méthodique coûte moins cher qu’un remplacement au hasard. L’effacement sécurisé des données n’est pas une option mais une obligation quand la machine change de main. Choisir le système d’exploitation en fonction du matériel disponible, et non l’inverse.',
      },
      {
        cat: 'Support',
        title: 'Médiation numérique et e-inclusion',
        summary:
          'Accompagnement des usagers du tiers-lieu et animation d’ateliers d’initiation, auprès de publics très éloignés de l’informatique.',
        tags: ['Accompagnement utilisateur', 'Animation d’ateliers', 'Pédagogie', 'Sensibilisation'],
        context:
          'La fracture numérique exclut concrètement des gens de démarches devenues obligatoires en ligne. Le tiers-lieu accueille des seniors, des parents, des jeunes adultes et des personnes en situation de précarité pour les rendre autonomes sur les outils du quotidien.',
        role:
          'Accueil et accompagnement individuel des usagers, puis contribution à l’animation d’ateliers collectifs : initiation à Windows (souris, clavier, gestion des fichiers), navigation Internet et moteurs de recherche, usage de la messagerie et des pièces jointes, prise en main d’un smartphone, et sensibilisation à la cybersécurité (mots de passe, hameçonnage, protection des données).',
        result:
          '15 à 20 personnes accompagnées sur la durée du stage, avec des retours globalement positifs.',
        learned:
          'Expliquer l’informatique à quelqu’un qui n’en a jamais fait est une compétence technique à part entière : il faut renoncer au vocabulaire métier sans pour autant simplifier faux. L’écoute précède le diagnostic — la demande formulée est rarement le vrai besoin. C’est ce qui m’a confirmé mon intérêt pour le support utilisateur.',
      },
    ],
    docs: [
      { label: 'Attestation de stage (PDF)', url: 'documents/attestation-stage-haitem.pdf' },
    ],
  },
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
  year: '2e année · 2026–2027',
  headline: 'Administrer, sécuriser et comprendre l\u2019infrastructure.',
  intro: 'Étudiant en BTS SIO option SISR. Je documente ici mes projets d\u2019infrastructure, ma veille technologique et mes certifications. Objectif : une alternance en administration réseau et systèmes.',
  status: 'Alternance recherchée · Var · Marseille & alentours',
  photo: 'assets/portrait-haitem.jpg',
  email: 'Haitem.bja.pro@gmail.com',
  phone: { display: '06 59 16 75 22', tel: '+33659167522' },
  github: 'https://github.com/SUPASQUID',
  linkedin: 'https://www.linkedin.com/in/haitem-bejaoui/',
  cv: 'documents/cv_HAITEM_BEJAOUI.pdf',
  skills: [
    { group: 'Réseau', items: ['Adressage IP', 'DHCP', 'Switch / VLAN'] },
    { group: 'Systèmes', items: ['Windows Server', 'Windows 11', 'Linux (débutant)', 'VirtualBox', 'Proxmox VE'] },
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
    objective: 'Alternance SISR en administration réseau & systèmes, dans le Var, à Marseille et alentours.'
  },
  veilleMethod: 'Flux RSS + newsletters, relevé hebdomadaire, fiche de synthèse par sujet.',
  veilleSources: ['ANSSI', 'CERT-FR', 'LeMagIT', 'Bleeping Computer'],

  /* Outils de veille. Pearltrees sert de collecteur : l’URL publique du
     compte reste à renseigner — mettre l’adresse dans `url` et le lien
     apparaîtra automatiquement. */
  veilleTools: [
    { name: 'Pearltrees', role: 'Collecte et classement thématique des sources', url: 'https://www.pearltrees.com/haitembejaoui' },
    { name: 'Flux RSS', role: 'Suivi quotidien des bulletins ANSSI et CERT-FR', url: null },
    { name: 'Newsletters', role: 'Veille hebdomadaire LeMagIT et Bleeping Computer', url: null },
  ],

  /**
   * Competences techniques, groupees par famille.
   *
   * Pas de note ni de barre : chaque ligne porte le contexte dans lequel la
   * competence a ete mise en oeuvre (`where`). Le jury peut donc remonter de
   * la competence a la preuve, et rien n'est auto-declare sans support.
   * Les valeurs de `where` doivent correspondre a un travail reellement
   * present sur le site.
   */
  skillGroups: [
    {
      group: 'Systemes',
      items: [
        { name: 'Windows 10 / 11', where: ['Stage', 'TP centre', 'Service civique'] },
        { name: 'Windows Server 2022', where: ['TP centre'] },
        { name: 'Linux \u2014 Debian, distributions legeres', where: ['Stage', 'Proxmox'] },
        { name: 'Installation et reinstallation d\u2019OS', where: ['Stage'] },
      ],
    },
    {
      group: 'Reseau',
      items: [
        { name: 'Adressage IP et sous-reseaux', where: ['TP centre'] },
        { name: 'DHCP', where: ['Pont Wi-Fi', 'TP centre'] },
        { name: 'Pont Wi-Fi point a point', where: ['Pont Wi-Fi'] },
        { name: 'Reseau NAT et isolation de laboratoire', where: ['VirtualBox'] },
      ],
    },
    {
      group: 'Virtualisation',
      items: [
        { name: 'VirtualBox', where: ['TP centre'] },
        { name: 'Proxmox VE 9 \u2014 interface web', where: ['Proxmox'] },
        { name: 'Proxmox VE 9 \u2014 ligne de commande', where: ['Proxmox'] },
      ],
    },
    {
      group: 'Support et materiel',
      items: [
        { name: 'Diagnostic et depannage poste de travail', where: ['Stage', 'Service civique'] },
        { name: 'Remplacement de composants \u2014 SSD, RAM, ventilation', where: ['Stage'] },
        { name: 'Accompagnement et formation des utilisateurs', where: ['Stage'] },
      ],
    },
    {
      group: 'Securite et donnees',
      items: [
        { name: 'Effacement securise des donnees', where: ['Stage'] },
        { name: 'RGPD applique a la revalorisation de materiel', where: ['Stage'] },
        { name: 'Sensibilisation hameconnage et mots de passe', where: ['Stage'] },
        { name: 'Chiffrement Wi-Fi WPA3', where: ['Pont Wi-Fi'] },
      ],
    },
    {
      group: 'Methode',
      items: [
        { name: 'Documentation technique et comptes-rendus', where: ['TP centre', 'Proxmox'] },
        { name: 'Veille informationnelle structuree', where: ['Veille'] },
        { name: 'Referencement et presence en ligne', where: ['Referencement'] },
      ],
    },
  ],
};

/**
 * BLOC 1 du referentiel BTS SIO \u2014 "Support et mise a disposition de
 * services informatiques".
 *
 * Les intitules et les sous-competences sont repris mot pour mot des colonnes
 * C a H du tableau de synthese officiel : ce sont les termes du referentiel,
 * pas une reformulation. L'ordre C1..C6 suit celui du tableau.
 */
const BLOC1 = [
  {
    code: 'C1',
    title: 'Gerer le patrimoine informatique',
    items: [
      'Recenser et identifier les ressources numeriques',
      'Exploiter des referentiels, normes et standards adoptes par le prestataire informatique',
      'Mettre en place et verifier les niveaux d\u2019habilitation associes a un service',
      'Verifier les conditions de la continuite d\u2019un service informatique',
      'Gerer des sauvegardes',
      'Verifier le respect des regles d\u2019utilisation des ressources numeriques',
    ],
  },
  {
    code: 'C2',
    title: 'Repondre aux incidents et aux demandes d\u2019assistance et d\u2019evolution',
    items: [
      'Collecter, suivre et orienter des demandes',
      'Traiter des demandes concernant les services reseau et systeme, applicatifs',
      'Traiter des demandes concernant les applications',
    ],
  },
  {
    code: 'C3',
    title: 'Developper la presence en ligne de l\u2019organisation',
    items: [
      'Participer a la valorisation de l\u2019image de l\u2019organisation sur les medias numeriques en tenant compte du cadre juridique et des enjeux economiques',
      'Referencer les services en ligne de l\u2019organisation et mesurer leur visibilite',
      'Participer a l\u2019evolution d\u2019un site Web exploitant les donnees de l\u2019organisation',
    ],
  },
  {
    code: 'C4',
    title: 'Travailler en mode projet',
    items: [
      'Analyser les objectifs et les modalites d\u2019organisation d\u2019un projet',
      'Planifier les activites',
      'Evaluer les indicateurs de suivi d\u2019un projet et analyser les ecarts',
    ],
  },
  {
    code: 'C5',
    title: 'Mettre a disposition des utilisateurs un service informatique',
    items: [
      'Realiser les tests d\u2019integration et d\u2019acceptation d\u2019un service',
      'Deployer un service',
      'Accompagner les utilisateurs dans la mise en place d\u2019un service',
    ],
  },
  {
    code: 'C6',
    title: 'Organiser son developpement professionnel',
    items: [
      'Mettre en place son environnement d\u2019apprentissage personnel',
      'Mettre en oeuvre des outils et strategies de veille informationnelle',
      'Gerer son identite professionnelle',
      'Developper son projet professionnel',
    ],
  },
];

/**
 * Matrice realisations x competences, reprise a l'identique du tableau de
 * synthese (fichier Excel remis au jury).
 *
 * ATTENTION : ce tableau et le PDF du tableau de synthese doivent dire la
 * meme chose. Toute croix ajoutee ici doit l'etre aussi dans le fichier
 * Excel, sinon le site contredit le document officiel.
 */
const SYNTHESE = [
  {
    label: 'Pont Wi-Fi entre deux batiments',
    place: 'centre',
    period: '15/02/2026',
    codes: ['C1', 'C2', 'C4', 'C5'],
  },
  {
    label: 'Depannage et diagnostic informatique',
    place: 'centre',
    period: 'annee 1',
    codes: ['C2', 'C5'],
  },
  {
    label: 'Mise en place du referencement en ligne',
    place: 'centre',
    period: '19/03/2026',
    codes: ['C1', 'C3', 'C4', 'C6'],
  },
  {
    label: 'Machine virtuelle VirtualBox sur reseau NAT',
    place: 'centre',
    period: '25/03/2026',
    codes: ['C1', 'C2', 'C4', 'C5', 'C6'],
  },
  {
    label: 'Administration d\u2019un hyperviseur Proxmox VE 9',
    place: 'centre',
    period: '22/09/2026',
    codes: ['C1', 'C2', 'C5', 'C6'],
  },
  {
    label: 'Stage \u2014 revalorisation de postes informatiques',
    place: 'entreprise',
    period: '06/07 au 07/08/2026',
    codes: ['C1', 'C2', 'C5', 'C6'],
  },
  {
    label: 'Stage \u2014 mediation numerique et e-inclusion',
    place: 'entreprise',
    period: '06/07 au 07/08/2026',
    codes: ['C2', 'C5'
, 'C6'],
  },
];

/**
 * CYBERSECURITE — rubrique imposée par la maquette du portfolio.
 *
 * `state` vaut 'obtenue' ou 'à suivre'. Les trois premières entrées sont
 * celles que la maquette demande nommément : tant qu’elles ne sont pas
 * faites, elles restent affichées honnêtement comme à suivre. Pour en
 * valider une, passer `state` à 'obtenue', ajouter `date` et déposer
 * l’attestation dans public/documents/ puis renseigner `pdf`.
 */
const CYBER = [
  {
    state: 'à suivre',
    title: 'SecNumAcadémie',
    org: 'ANSSI',
    description:
      'MOOC de référence de l’Agence nationale de la sécurité des systèmes d’information : panorama de la sécurité du numérique, authentification, sécurité des postes et des réseaux, usages professionnels.',
  },
  {
    state: 'à suivre',
    title: 'Atelier RGPD',
    org: 'CNIL',
    description:
      'Formation en ligne de la CNIL sur le règlement général sur la protection des données : principes, droits des personnes, responsabilités du responsable de traitement et du sous-traitant.',
  },
  {
    state: 'à suivre',
    title: 'Défis et enjeux de la cybersécurité',
    org: 'MOOC',
    description:
      'Enjeux stratégiques et organisationnels de la cybersécurité : analyse du risque, gouvernance, réponse à incident.',
  },
  {
    state: 'obtenue',
    title: 'Google IT Support',
    org: 'Google · Coursera',
    date: 'décembre 2025',
    description:
      'Certificat professionnel en six cours, dont un volet complet de sécurité informatique : chiffrement, authentification, durcissement des postes et des réseaux.',
    pdf: 'documents/Coursera_HB_Certfi_ITSP.pdf',
    verifyUrl: 'https://coursera.org/verify/professional-cert/NIJTGMDZZG3L',
  },
];

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
  { tag: 'À jour', title: 'Curriculum Vitae', description: 'Mon parcours académique et mes certifications à jour.', size: '185 KB', url: 'documents/cv_HAITEM_BEJAOUI.pdf' },
  { tag: 'E4', title: 'SISR — Tableau de synthèse', description: 'Récapitulatif des situations professionnelles et des compétences réseau.', size: '142 KB', url: 'documents/tableau-synthese-e4.pdf' },
  { tag: 'Stage', title: 'Attestation de stage — 1re année', description: 'Stage au tiers-lieu numérique L’ALTernativ83 (Ligue de l’enseignement – FOL83), du 6 juillet au 7 août 2026.', size: '929 KB', url: 'documents/attestation-stage-haitem.pdf' },
  { tag: 'Civique', title: 'Bilan de mission — Service Civique', description: 'Sept mois à la Ligue de l\u2019enseignement – FOL du Var : médiation numérique, ateliers, reconditionnement de matériel.', size: '485 KB', url: 'documents/Bilan_Haitem.pdf' },
  { tag: 'Valide', title: 'Certification Google IT Support', description: 'Validation des fondamentaux du support, de la gestion de parc et de l\u2019administration système.', size: '347 KB', url: 'documents/Coursera_HB_Certfi_ITSP.pdf' }
];

/**
 * LEGAL — les quatre pages de pied de page exigées par la maquette.
 *
 * Le contenu décrit ce que le site fait RÉELLEMENT : site statique, aucun
 * cookie, aucun traceur, aucun script tiers, polices auto-hébergées, aucun
 * formulaire. Vérifié par audit du code. Si un jour un formulaire, une
 * mesure d’audience ou un service tiers est ajouté, ces pages doivent être
 * corrigées — sinon elles deviennent fausses, ce qui est pire que rien.
 *
 * À compléter : l’adresse postale complète de l’hébergeur, que je n’ai pas
 * vérifiée. La mentionner exactement si tu veux être strictement conforme.
 */
const LEGAL = [
  {
    slug: 'mentions-legales',
    title: 'Mentions légales',
    intro: 'Informations relatives à l’éditeur et à l’hébergeur de ce site.',
    blocks: [
      { heading: 'Éditeur du site', paras: [
        'Ce site est édité à titre personnel par Haitem Bejaoui, étudiant en BTS Services Informatiques aux Organisations, option SISR.',
        'Contact : haitem.bja.pro@gmail.com',
      ] },
      { heading: 'Objet du site', paras: [
        'Ce site est un portfolio scolaire et professionnel. Il présente des travaux réalisés dans le cadre d’une formation en BTS SIO, une veille technologique et des documents personnels. Il n’a aucune activité commerciale et ne propose ni vente ni service payant.',
      ] },
      { heading: 'Hébergement', paras: [
        'Le site est hébergé par Vercel Inc. (États-Unis) — vercel.com.',
      ] },
      { heading: 'Propriété intellectuelle', paras: [
        'Les textes, schémas et documents présentés sont l’œuvre de l’auteur du site, sauf mention contraire. Les sources externes citées dans la veille technologique appartiennent à leurs auteurs respectifs et sont mentionnées à titre de référence.',
      ] },
    ],
  },
  {
    slug: 'confidentialite',
    title: 'Politique de confidentialité',
    intro: 'Ce site ne collecte aucune donnée personnelle. Voici le détail.',
    blocks: [
      { heading: 'Aucune collecte de données', paras: [
        'Ce site est entièrement statique : il se contente d’envoyer des pages déjà écrites. Il ne comporte aucun formulaire, aucun compte utilisateur, aucune base de données et aucun outil de mesure d’audience.',
        'Aucune donnée personnelle n’est donc collectée, enregistrée ni transmise à un tiers lors de la consultation.',
      ] },
      { heading: 'Aucun service tiers', paras: [
        'Le site ne charge aucun script externe. Les polices de caractères sont hébergées sur le site lui-même et ne sont pas appelées depuis un serveur tiers. Aucune publicité, aucun bouton de réseau social embarqué, aucun lecteur vidéo externe.',
      ] },
      { heading: 'Liens sortants', paras: [
        'Le site contient des liens vers des plateformes externes (GitHub, LinkedIn, Coursera). En suivant un de ces liens, vous quittez ce site : la politique de confidentialité de la plateforme concernée s’applique alors, et non celle-ci.',
      ] },
      { heading: 'Journaux techniques de l’hébergeur', paras: [
        'L’hébergeur du site peut conserver des journaux de connexion techniques (adresse IP, date, page demandée) pour assurer le fonctionnement et la sécurité du service. Ce traitement relève de l’hébergeur et non de l’éditeur du site.',
      ] },
      { heading: 'Vos droits', paras: [
        'Aucune donnée n’étant collectée par l’éditeur, il n’y a rien à consulter, rectifier ou supprimer. Pour toute question, vous pouvez écrire à haitem.bja.pro@gmail.com.',
      ] },
    ],
  },
  {
    slug: 'cookies',
    title: 'Utilisation des cookies',
    intro: 'Ce site ne dépose aucun cookie.',
    blocks: [
      { heading: 'Aucun cookie déposé', paras: [
        'Ce site ne dépose aucun cookie sur votre appareil, ni technique, ni de mesure d’audience, ni publicitaire. Il n’utilise pas non plus le stockage local du navigateur.',
        'C’est la raison pour laquelle aucune bannière de consentement ne vous est présentée : il n’y a rien à consentir.',
      ] },
      { heading: 'Comment le vérifier', paras: [
        'Vous pouvez le constater vous-même : ouvrez les outils de développement de votre navigateur (touche F12), onglet « Application » ou « Stockage », rubrique « Cookies ». La liste correspondant à ce site est vide.',
      ] },
      { heading: 'Sites tiers', paras: [
        'Si vous suivez un lien vers GitHub, LinkedIn ou Coursera, ces sites peuvent déposer leurs propres cookies une fois que vous êtes chez eux. Leur politique s’applique alors.',
      ] },
    ],
  },
  {
    slug: 'cgu',
    title: 'Conditions générales d’utilisation',
    intro: 'Conditions applicables à la consultation de ce site.',
    blocks: [
      { heading: 'Objet', paras: [
        'Les présentes conditions encadrent la consultation de ce portfolio. Le simple fait d’accéder au site vaut acceptation de ces conditions.',
      ] },
      { heading: 'Accès au site', paras: [
        'L’accès est libre et gratuit. L’éditeur s’efforce de maintenir le site accessible, sans pouvoir le garantir : une interruption peut survenir pour maintenance, mise à jour ou raison technique indépendante de sa volonté.',
      ] },
      { heading: 'Utilisation du contenu', paras: [
        'Les contenus sont mis à disposition pour information, dans un cadre scolaire et professionnel. Leur reproduction à des fins commerciales, ou leur réutilisation sans mention de l’auteur, n’est pas autorisée. La consultation, la citation et le partage du lien sont libres.',
      ] },
      { heading: 'Exactitude des informations', paras: [
        'Les documents techniques et les articles de veille reflètent l’état des connaissances de l’auteur à leur date de rédaction, dans un cadre de formation. Ils ne constituent ni un conseil professionnel ni une documentation de référence, et peuvent devenir obsolètes.',
      ] },
      { heading: 'Contact', paras: [
        'Toute question ou demande relative au site peut être adressée à haitem.bja.pro@gmail.com.',
      ] },
    ],
  },
];

if (typeof module !== 'undefined')
  module.exports = {
    DATA, ENTREPRISE, VEILLE, PROFILE, CERTIFICATIONS, CYBER, DOCUMENTS, LEGAL,
    BLOC1, SYNTHESE,
  };
