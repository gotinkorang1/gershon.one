/**
 * French case studies. Same TODO warning as the English versions — the figures
 * are placeholders and must be replaced with real numbers before publishing.
 */

export const caseStudiesFr: Record<
  string,
  {
    title: string;
    summary: string;
    role: string;
    sections: { heading: string; body: string[] }[];
    outcomes: string[];
  }
> = {
  "erpnext-bilingual-id-cards": {
    title: "Des badges que deux langues devaient partager",
    summary:
      "ERPNext imprime des documents, pas des badges. Un format d'impression Jinja qui place deux badges d'employé bilingues — recto et verso — sur une seule feuille A4, aux dimensions qu'un agent peut vérifier à l'entrée.",
    role: "Chargé de support informatique",
    outcomes: [
      "badges par feuille A4",
      "langues sur chaque badge",
      "publié et réutilisable",
    ],
    sections: [
      {
        heading: "Pourquoi le développer",
        body: [
          "Le personnel avait besoin de badges d'identification. Les dossiers des employés existaient déjà dans ERPNext — noms, photographies, services, intitulés de poste — les données n'étaient donc pas le problème. Les faire figurer sur un support plastique, si.",
          "Deux options : commander une conception de badge, ce qui implique de payer chaque modification ultérieure et d'attendre qu'un tiers l'exécute, ou un format d'impression qui lit directement l'ERP. Un format d'impression coûte un après-midi, puis ne coûte plus rien. Nouvel employé : on imprime. Changement de service : on imprime. Aucun aller-retour de conception.",
          "ERPNext est conçu pour imprimer des factures et des bons de commande — des documents qui remplissent une page. Un objet au format carte bancaire avec un recto et un verso n'est pas ce que le moteur d'impression attend, et l'essentiel du travail s'est joué dans cet écart.",
        ],
      },
      {
        heading: "Deux langues devant rester lisibles",
        body: [
          "L'entreprise fonctionne en anglais et en chinois. Un badge que seul un groupe peut lire n'est pas un document d'identification pour la moitié de ceux qui le portent : les deux langues devaient donc figurer sur chaque badge plutôt que d'imprimer deux séries distinctes.",
          "Chaque libellé porte les deux : 姓名 Name, 工号 ID, 职位 Role, 部门 Dept., 授权签名 Authorized Signature. Le chinois d'abord, l'anglais ensuite, systématiquement — un ordre variable rend le badge plus difficile à parcourir rapidement, ce qui est précisément la qualité première d'un badge.",
          "C'est cette contrainte qui a déterminé la mise en page. Les libellés bilingues sont environ deux fois plus larges que des libellés monolingues, sur un support qui ne peut pas s'agrandir. Ils occupent une colonne fixe de 80 px afin que les valeurs restent alignées quelle que soit la longueur du libellé, et le corps de texte descend à 11 px pour les données. L'ensemble se lit comme une grille délibérée plutôt que comme un texte qui serait entré de justesse.",
        ],
      },
      {
        heading: "Faire produire un badge à un navigateur, pas une page",
        body: [
          "Le rendu passe par un moteur PDF qui pilote un navigateur : les difficultés relèvent donc de l'impression, un domaine que la mise en page web n'a pas l'habitude d'affronter.",
          "Tout est exprimé en centimètres, pas en pixels. La page est déclarée A4 sans marge, et chaque badge mesure 9,2 × 5,7 cm — des dimensions qui survivent au passage par le moteur de rendu jusqu'à la feuille physique. Des pixels auraient dépendu des hypothèses du moteur sur la densité d'écran.",
          "Les photographies ont cédé les premières. Un chemin d'image relatif s'affiche correctement dans l'aperçu du navigateur, puis arrive vide dans le PDF, car le processus de rendu ne partage pas l'origine de la page. Le filtre `abs_url` de Frappe rend le chemin absolu et la photographie apparaît. Une correction d'un seul mot, invisible jusqu'à ce qu'on découvre un rectangle blanc à la place d'un visage sur un badge imprimé.",
          "Les deux badges par feuille proviennent d'une boucle Jinja qui rend deux fois le même badge, avec `page-break-inside: avoid` pour que la paire ne soit jamais scindée entre deux pages. Recto et verso s'empilent en colonne : une feuille A4 produit donc un badge complet une fois découpé et plastifié — et la bordure en pointillés est un repère de coupe, non un ornement.",
        ],
      },
      {
        heading: "Ce que je referais autrement",
        body: [
          "Le QR code est le point faible. Il est récupéré auprès d'un générateur tiers au moment de l'impression et encode le site de l'entreprise — il est donc identique sur tous les badges, et l'impression dépend de la disponibilité d'un service externe. Il devrait encoder l'identifiant de l'employé et être généré localement. En l'état, c'est un ornement qui ressemble à une fonctionnalité, ce qui est pire que pas de QR code du tout.",
          "Le badge mesure 9,2 × 5,7 cm, soit légèrement plus que la norme ID-1 sur laquelle sont calés les portefeuilles, les porte-badges et les imprimantes à cartes. Il s'imprime et se découpe correctement sur A4, mais il faudrait l'ajuster avant de l'envoyer vers une imprimante à cartes PVC.",
          "Le README publié documente par ailleurs un répertoire `src/` qui n'existe pas — les fichiers se trouvent à la racine du dépôt. Quiconque suit les étapes d'installation se heurte à une impasse dès la deuxième. C'est une correction de cinq minutes que je n'ai pas encore faite, et c'est le type d'imprécision qui rend discrètement un travail partagé inutilisable pour celui qui le découvre.",
        ],
      },
    ],
  },
  "batch-invoice-pdf-processor": {
    title: "La pile de factures que l'on ressaisissait à la main",
    summary:
      "L'équipe commerciale ressaisissait les lignes de machines et de véhicules d'un dossier de factures scannées dans un modèle Word, un PDF à la fois. Un outil de traitement par lots sous Windows lit chaque PDF, ne conserve que les lignes admissibles et exporte une facture finalisée nommée d'après son numéro BOE — avec un recours à l'IA pour les scans que le texte brut n'atteint pas.",
    role: "Chargé de support informatique",
    outcomes: [
      "fournisseurs d'IA pour les scans illisibles",
      "PDF propre par facture source",
      "valeurs inventées en cas de doute",
    ],
    sections: [
      {
        heading: "Le travail avant le script",
        body: [
          "Le service commercial recevait les factures douanières sous forme d'un dossier de PDF scannés — un par déclaration en douane, chacun nommé d'après son numéro BOE. Il fallait ouvrir chaque fichier, parcourir les lignes et ne recopier que les entrées de machines et de véhicules dans une copie neuve d'une facture Word de référence, en écartant les pièces, les pièces détachées, les accessoires et tout élément ambigu.",
          "Puis les totaux : additionner les lignes admissibles en un montant FOB, en déduire le fret et l'assurance, et enregistrer le document finalisé en PDF nommé d'après le numéro BOE. Multipliez cela par un dossier entier et c'est un après-midi de recopie minutieuse et répétitive, où un seul montant mal saisi donne une facture erronée.",
          "Rien de difficile. Tout est lent, et le travail manuel lent est le terreau des erreurs. La tâche était un travail de machine occupant l'après-midi d'une personne.",
        ],
      },
      {
        heading: "Ne conserver que ce qui est admissible",
        body: [
          "Le cœur de l'outil est un classificateur qui décide, ligne par ligne, si un article est une machine ou un véhicule. Il confronte chaque description à une liste configurable de mots-clés d'inclusion, qu'une liste d'exclusion supplante — ainsi « huile moteur » est écartée bien que « moteur » aurait correspondu.",
          "Il est délibérément prudent. Les articles ambigus ou mal décrits sont exclus plutôt que devinés. Sur une facture commerciale, une inclusion erronée est un défaut que quelqu'un devra rattraper en aval, tandis qu'une ligne manquante est visible et facile à rajouter — l'outil penche donc vers l'omission, et le fait de manière évidente.",
          "Les règles résident dans un fichier JSON, non dans le code : le vocabulaire peut donc être ajusté aux formulations d'un nouveau fournisseur sans toucher à l'analyseur.",
        ],
      },
      {
        heading: "Un modèle neuf à chaque fois",
        body: [
          "Chaque facture est construite à partir d'une copie propre du modèle Word de référence plutôt qu'en modifiant la sortie précédente, de sorte que rien ne se propage d'un fichier au suivant. L'outil repère le tableau des lignes grâce aux libellés de son en-tête, copie la mise en forme d'une ligne d'exemple et remplit une ligne par article admissible, dans l'ordre d'origine.",
          "Les métadonnées et les totaux vont dans des marqueurs nommés — numéro de facture, référence, et les trois montants calculés : le FOB comme somme des totaux de lignes, le fret à un pourcentage fixe du FOB, l'assurance déduite du FOB majoré du fret. Le calcul est identique à chaque fois, ce qui est précisément la raison pour laquelle une personne ne devrait pas s'en charger.",
          "L'export passe par Word lui-même plutôt que par une bibliothèque PDF, car la facture finalisée doit reproduire exactement la mise en page du modèle, et le moyen le plus sûr de le garantir est de laisser l'application qui possède le format produire le PDF.",
        ],
      },
      {
        heading: "Quand le PDF est une photographie",
        body: [
          "Certaines factures arrivent sous forme de scans — une image sans couche de texte que l'analyseur puisse lire. Plutôt que d'échouer sur celles-ci, l'outil peut se rabattre sur un modèle de vision, et il le traite en dernier recours : il exécute d'abord l'analyseur de texte ordinaire et n'appelle un modèle que lorsqu'il ne parvient pas à trouver avec certitude des articles admissibles.",
          "Trois fournisseurs sont pris en charge — OpenAI, Gemini et Claude — car un service peut déjà payer l'un et non les autres. On demande au modèle de ne renvoyer que les articles dont il est sûr, chacun avec une description lisible, un total unitaire, un total de ligne et un numéro de page, et d'exclure tout élément incertain plutôt que d'inventer une valeur.",
          "Cette dernière règle est l'essentielle. Un outil qui devine un montant sur une facture douanière est pire qu'un outil qui laisse un vide : le recours à l'IA est donc tenu à la même exigence de prudence que le classificateur par mots-clés — dans le doute, on s'abstient et on laisse un humain voir le vide.",
        ],
      },
      {
        heading: "Conçu pour être interrompu",
        body: [
          "Un lot qui s'exécute sur un dossier volumineux, en pilotant Word pour chaque fichier, finira par en rencontrer un qui bloque. Si cela imposait de reprendre tout le dossier, l'outil serait un handicap précisément sur les traitements pour lesquels il a été conçu.",
          "Il enregistre donc des points de reprise. L'état de chaque fichier source est écrit dans le dossier de sortie au fur et à mesure — traité, ignoré, échoué — aux côtés d'un journal d'événements en ajout seul et d'un CSV par fichier. Relancez sur le même dossier et il reprend là où il s'était arrêté : les fichiers terminés sont laissés tels quels, ceux en échec ou interrompus sont réessayés, et une option force une exécution propre lorsqu'on le souhaite.",
          "C'est la partie ingrate, et c'est ce qui distingue une démonstration d'un outil que le service commercial peut réellement laisser tourner.",
        ],
      },
      {
        heading: "Ce que je referais autrement",
        body: [
          "La dépendance à Word lie l'outil à une machine Windows dotée d'Office. C'était le bon choix là où il s'exécute, mais cela signifie que l'étape d'export ne peut migrer vers un serveur sans changer de moteur — j'isolerais cette frontière plus proprement afin qu'un moteur de rendu sans interface puisse s'y substituer.",
          "Le classificateur repose sur des mots-clés, ce qui est transparent et facile à auditer mais aveugle aux synonymes qu'on ne lui a pas indiqués. Le recours à l'IA compense discrètement ce point sur les scans ; la version honnête de la conception appliquerait le même raisonnement fondé sur un score de confiance au traitement du texte également, plutôt que deux mécanismes distincts pour un même jugement.",
          "Et comme les articles incertains sont exclus par principe, l'outil suppose toujours qu'un humain vérifie ce qu'il a laissé de côté. C'est le comportement par défaut correct, mais le récapitulatif qu'il produit pourrait mieux faire ressortir quelles lignes ont été écartées et pourquoi, afin que cette vérification soit un contrôle de deux minutes plutôt qu'une relecture de l'original.",
        ],
      },
    ],
  },
  "industrial-park-network-1200-acres": {
    title: "Connecter un parc industriel de 1 200 acres",
    summary:
      "Aucune fibre disponible sur place, aucun lien satellite unique suffisamment rapide, et des flux de vidéosurveillance et de caisse à acheminer des usines vers le siège. Huit terminaux Starlink agrégés vers une couche de distribution en fibre optique.",
    role: "Chargé de support informatique",
    outcomes: [
      "acres couverts par la dorsale",
      "terminaux Starlink agrégés",
      "TODO — débit agrégé mesuré",
    ],
    sections: [
      {
        heading: "La contrainte",
        body: [
          "Un parc industriel international de 1 200 acres à Afienya – Shai Hills, accueillant de nombreux fabricants et producteurs internationaux, avec des usines, des bureaux et un siège répartis sur l'ensemble du site. Chaque bâtiment avait besoin d'un accès internet. Le siège devait recevoir les flux de vidéosurveillance et les données de caisse de tous ces bâtiments. Et aucune fibre terrestre ne desservait le site.",
          "Cela écarte la solution évidente. Un seul terminal satellite ne peut pas alimenter un parc entier — ni la bande passante cumulée de dizaines de caméras en téléversement continu, ni les transactions de caisse, ni le trafic bureautique ordinaire. Acheter un lien plus rapide n'était pas une option : il n'y en avait aucun à acheter.",
          "TODO : préciser le nombre approximatif de bâtiments, de caméras et de terminaux de caisse desservis. L'échelle est tout l'intérêt de ce récit et des chiffres précis portent davantage que « des dizaines ».",
        ],
      },
      {
        heading: "Agréger ce qui était disponible",
        body: [
          "Si un terminal ne suffit pas, la question devient de savoir si huit peuvent se comporter comme un seul lien plus large. Starlink fournit une connexion grand public sans agrégation native : le regroupement doit donc se faire au niveau du routeur.",
          "Huit terminaux sont installés individuellement avec une vue dégagée du ciel et arrivent chacun sur son propre port d'un routeur MikroTik comme WAN distinct. RouterOS répartit le trafic entre eux, de sorte qu'aucun terminal ne supporte seul l'ensemble du site et que la perte de l'un dégrade la capacité sans provoquer de coupure.",
          "TODO : décrire la méthode de répartition réellement utilisée entre les huit liens — équilibrage PCC, classificateur par connexion, ECMP ou autre — et le comportement en cas de perte d'un terminal. C'est la première question que posera un recruteur technique.",
        ],
      },
      {
        heading: "Traverser 1 200 acres",
        body: [
          "Une bande passante agrégée au siège ne sert à rien si elle n'atteint pas une usine située à un kilomètre. Le sans-fil seul n'aurait pas supporté un téléversement continu de vidéosurveillance à cette distance : le parc avait besoin de fibre.",
          "Le routeur alimente un commutateur d'entreprise Huawei S5735, qui alimente à son tour un équipement GPON dont les quatre ports fibre rejoignent un panneau de brassage. Chaque port est réparti en 1:4 par des répartiteurs passifs, desservant les bâtiments à travers le parc. Le caractère passif compte : aucune alimentation ni équipement actif sur le terrain, donc un point de défaillance en moins en environnement industriel.",
          "Le trafic circule dans les deux sens sur la même dorsale : vidéosurveillance et données de caisse vers les serveurs du siège, accès internet redistribué vers les usines.",
          "TODO : indiquer la longueur approximative des liaisons fibre et s'il s'agit de monomode.",
        ],
      },
      {
        heading: "Au-delà du périmètre",
        body: [
          "Tout ce que l'entreprise exploite ne se trouve pas dans les 1 200 acres. Des sites extérieurs doivent accéder aux systèmes du siège, et tirer de la fibre jusqu'à eux n'était pas proportionné.",
          "Ces sites sont raccordés par liaisons sans fil point à point, avec des tunnels VPN pour le trafic devant atteindre les ressources internes. Un outil différent pour une distance différente : la fibre là où la densité le justifie, le sans-fil ailleurs.",
        ],
      },
      {
        heading: "Ce que je ferais différemment",
        body: [
          "La supervision est le point faible. Avec huit liens WAN, la dégradation silencieuse de l'un passe facilement inaperçue : le site reste accessible, simplement plus lent, et personne ne signale de panne. Des métriques par lien et une alerte sur changement d'état combleraient cette lacune à peu de frais.",
          "La configuration réside également sur le routeur plutôt que dans un dépôt versionné. Elle est sauvegardée, mais une reconstruction complète consisterait à restaurer un fichier plutôt qu'à appliquer une configuration connue depuis une source.",
          "TODO : si vous avez depuis ajouté de la supervision ou modifié la conception, le mentionner ici.",
        ],
      },
    ],
  },
  "erpnext-administration": {
    title: "Maintenir ERPNext et Odoo pour une équipe d'ingénierie",
    summary:
      "Administration de la plateforme ERP dont dépendent l'ingénierie et l'exploitation — mises à jour, intégrité des données, sauvegardes réellement restaurées.",
    role: "Chargé de support informatique",
    outcomes: ["TODO — utilisateurs pris en charge", "TODO — temps de restauration testé", "TODO — disponibilité"],
    sections: [
      {
        heading: "Rôle du système",
        body: [
          "L'ERP est le lieu où vit réellement le travail d'ingénierie et d'exploitation : chantiers, approvisionnement et les registres qui les relient. Quand il est indisponible, les gens s'arrêtent plutôt que de contourner.",
          "TODO : préciser quels modules sont réellement utilisés et combien de personnes en dépendent quotidiennement.",
        ],
      },
      {
        heading: "Des sauvegardes réellement restaurées",
        body: [
          "Une sauvegarde non testée est une supposition. La question utile n'est pas de savoir si les sauvegardes s'exécutent, mais combien de temps prend une restauration et si le système restauré est complet.",
          "TODO : décrire votre calendrier de sauvegarde, où sont conservées les copies et la dernière restauration complète effectuée. Si vous n'en avez jamais répété une, cela vaut la peine avant de rédiger cette section — et indépendamment du site web.",
        ],
      },
      {
        heading: "Des mises à jour sans excuses à présenter",
        body: [
          "TODO : décrire votre méthode de préparation et d'application des mises à jour, ainsi qu'une mise à jour qui s'est mal passée et ce que vous avez changé ensuite. Les recruteurs accordent plus de valeur à la seconde partie.",
        ],
      },
    ],
  },
  "diagnosing-fibre-latency": {
    title: "Trouver une panne là où personne ne cherchait",
    summary:
      "Des lenteurs intermittentes imputées à l'ERP se sont révélées être un problème de routage. Court récit d'un diagnostic par couches plutôt que par intuition.",
    role: "Chargé de support informatique",
    outcomes: ["TODO — délai de résolution", "TODO — utilisateurs touchés"],
    sections: [
      {
        heading: "Le symptôme signalé",
        body: [
          "La plainte portait sur la lenteur de l'ERP. C'est généralement l'application en cause, donc c'est là que l'on cherche d'abord — et là où j'aurais perdu une journée si j'avais commencé par là.",
          "TODO : décrire ce que les utilisateurs ont réellement signalé et ce qui vous a fait douter de l'explication évidente.",
        ],
      },
      {
        heading: "Descendre les couches",
        body: [
          "Une lenteur applicative et une latence réseau se présentent de façon identique pour l'utilisateur. La différence apparaît dès que l'on mesure au lieu de demander.",
          "TODO : décrire la séquence réellement suivie — ce que vous avez mesuré, ce que chaque résultat a écarté, et le moment où l'hypothèse a changé.",
        ],
      },
      {
        heading: "La panne réelle",
        body: [
          "TODO : ce dont il s'agissait, comment vous l'avez corrigée, et ce que vous avez mis en place pour la détecter plus tôt la prochaine fois.",
        ],
      },
    ],
  },
};
