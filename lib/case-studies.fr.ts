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
