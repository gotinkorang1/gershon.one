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
  "campus-network-1200-acres": {
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
          "Un parc industriel de 1 200 acres, avec des usines, des bureaux et un siège répartis sur l'ensemble du site. Chaque bâtiment avait besoin d'un accès internet. Le siège devait recevoir les flux de vidéosurveillance et les données de caisse de tous ces bâtiments. Et aucune fibre terrestre ne desservait le site.",
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
