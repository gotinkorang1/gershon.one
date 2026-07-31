/**
 * French case studies — translations of the English studies in
 * lib/case-studies.ts. The outcome *values* come from that file; this supplies
 * the localised title, summary, outcome labels and prose. Same bar: real,
 * defensible detail only.
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
      "terminaux Starlink agrégés",
      "débit agrégé sur la fibre",
      "caméras de vidéosurveillance transportées",
    ],
    sections: [
      {
        heading: "La contrainte",
        body: [
          "Un parc industriel international de 1 200 acres à Afienya – Shai Hills, accueillant de nombreux fabricants et producteurs internationaux, avec des usines, des bureaux et un siège répartis sur l'ensemble du site. Chaque bâtiment avait besoin d'un accès internet. Le siège devait recevoir les flux de vidéosurveillance et les données de caisse de tous ces bâtiments. Et aucune fibre terrestre ne desservait le site.",
          "Cela écarte la solution évidente. Un seul terminal satellite ne peut pas alimenter un parc entier — ni la bande passante cumulée de dizaines de caméras en téléversement continu, ni les transactions de caisse, ni le trafic bureautique ordinaire. Acheter un lien plus rapide n'était pas une option : il n'y en avait aucun à acheter.",
          "Le parc est aménagé en quatre phases ; ce réseau couvre les deux qui sont en service. On y trouve douze usines et huit entrepôts, ainsi que les équipements qui font vivre un parc de cette taille : un hôtel, le siège, un hôpital, une banque, un supermarché, un centre commercial, un restaurant, un KTV et des foyers d'hébergement pour le personnel local et étranger. Chaque usine et chaque entrepôt à eux seuls comptent entre 26 et 38 caméras de vidéosurveillance — bien plus de cinq cents flux — et chaque site dispose d'un terminal de point de vente. Tout cela remonte vers le siège en continu.",
        ],
      },
      {
        heading: "Agréger ce qui était disponible",
        body: [
          "Si un terminal ne suffit pas, la question devient de savoir si huit peuvent se comporter comme un seul lien plus large. Starlink fournit une connexion grand public sans agrégation native : le regroupement doit donc se faire au niveau du routeur.",
          "Huit terminaux sont installés individuellement avec une vue dégagée du ciel et arrivent chacun sur son propre port d'un routeur MikroTik comme WAN distinct. RouterOS répartit le trafic entre eux, de sorte qu'aucun terminal ne supporte seul l'ensemble du site et que la perte de l'un dégrade la capacité sans provoquer de coupure.",
          "La répartition repose sur le classificateur par connexion — PCC — dans RouterOS. Chaque nouvelle connexion est affectée à l'un des huit terminaux et y reste fixée, de sorte qu'un téléchargement donné emprunte un seul lien tandis que la charge globale se répartit uniformément sur les huit. Comme la répartition se fait par connexion et non par paquet, les sessions n'arrivent jamais dans le désordre. Lorsqu'un terminal tombe, PCC redistribue sa part sur les terminaux encore actifs : le parc ralentit légèrement au lieu de perdre la connectivité — toute la raison d'agréger huit liens grand public plutôt que d'en croire un seul.",
        ],
      },
      {
        heading: "Traverser 1 200 acres",
        body: [
          "Une bande passante agrégée au siège ne sert à rien si elle n'atteint pas une usine située à un kilomètre. Le sans-fil seul n'aurait pas supporté un téléversement continu de vidéosurveillance à cette distance : le parc avait besoin de fibre.",
          "Le routeur alimente un commutateur d'entreprise Huawei S5735, qui alimente à son tour un équipement GPON dont les quatre ports fibre rejoignent un panneau de brassage. Chaque port est réparti en 1:4 par des répartiteurs passifs, desservant les bâtiments à travers le parc. Le caractère passif compte : aucune alimentation ni équipement actif sur le terrain, donc un point de défaillance en moins en environnement industriel.",
          "Le trafic circule dans les deux sens sur la même dorsale : vidéosurveillance et données de caisse vers les serveurs du siège, accès internet redistribué vers les usines.",
          "Sur cette dorsale, la fibre achemine environ 2,5 Gbit/s, et chaque appareil y bénéficie de 20 à 50 Mbit/s — de quoi absorber les centaines de caméras en téléversement continu, plus le trafic de caisse et bureautique, sans qu'ils se privent mutuellement de bande passante.",
        ],
      },
      {
        heading: "Là où la fibre s'arrête, la radio prend le relais",
        body: [
          "La fibre justifie son coût là où la densité d'usines et d'entrepôts rend le creusement rentable — les deux premières phases. Les phases trois et quatre, plus éloignées, sont desservies par des liaisons radio point à point : environ 800 Mbit/s par voie hertzienne, avec des tunnels VPN pour tout ce qui doit atteindre les systèmes internes du siège.",
          "C'est une adéquation délibérée de l'outil à la distance — la fibre là où la densité le justifie, la radio ailleurs — et cela a permis de mettre en service les phases ultérieures sans attendre une tranchée.",
        ],
      },
      {
        heading: "Ce que je ferais différemment",
        body: [
          "La supervision est le point faible. Avec huit liens WAN, la dégradation silencieuse de l'un passe facilement inaperçue : le site reste accessible, simplement plus lent, et personne ne signale de panne. Des métriques par lien et une alerte sur changement d'état combleraient cette lacune à peu de frais.",
          "La configuration réside également sur le routeur plutôt que dans un dépôt versionné. Elle est sauvegardée, mais une reconstruction complète consisterait à restaurer un fichier plutôt qu'à appliquer une configuration connue depuis une source.",
          "L'étape suivante, c'est l'agrégation plutôt que l'équilibrage. Le PCC répartit les sessions sur les huit terminaux mais ne peut pas rendre une session plus rapide qu'un seul lien, et le basculement se fait par connexion plutôt qu'instantanément. Passer à une véritable couche d'agrégation comme SpeedFusion réunirait les terminaux en un seul tuyau logique et basculerait en moins d'une seconde — l'amélioration que j'apporterais ensuite.",
        ],
      },
    ],
  },
  "erpnext-administration": {
    title: "Huit mille dossiers RH, et qui peut y accéder",
    summary:
      "Les RH avaient besoin d'un système unique pour les dossiers des employés, l'attribution du matériel, les cartes de travail et l'affectation des foyers — des données personnelles réelles pour 8 000 travailleurs répartis sur quatre bureaux. Bâti sur ERPNext, tenu hors de l'internet public, avec un accès administrateur filtré par un VPN configuré sur le routeur MikroTik.",
    role: "Chargé de support informatique",
    outcomes: [
      "dossiers de travailleurs sur un seul système",
      "bureaux RH, un par phase",
      "exposition à l'internet public",
    ],
    sections: [
      {
        heading: "Ce dont les RH avaient réellement besoin",
        body: [
          "Le parc est géré par Greenhouse International Development Group, et son service RH n'avait aucun endroit unique pour conserver ce sur quoi il repose : dossiers de l'entreprise et des employés, quel matériel avait été remis à qui, cartes de travail, foyer d'hébergement de chaque travailleur, et bien d'autres données personnelles encore. Répartis sur un effectif d'environ 8 000 personnes et conservés sous la forme que chaque bureau avait adoptée, ce n'est pas un problème de classement — c'est un problème de données qui n'attend que de devenir un incident.",
          "La réponse : un système unique sur ERPNext, source de vérité unique pour chaque dossier d'employé, structuré de sorte qu'un matériel attribué ou un foyer réaffecté soit consigné une seule fois et visible partout. Quatre bureaux RH, un par phase du parc, travaillant tous à partir des mêmes données plutôt que de quatre copies divergentes.",
        ],
      },
      {
        heading: "Pourquoi il ne touche jamais l'internet public",
        body: [
          "Une base contenant les données personnelles de 8 000 personnes est une lourde responsabilité, et en tant que seule personne informatique sur site à comprendre ce qu'une fuite signifierait, c'était à moi de concevoir en conséquence.",
          "Le système n'est donc pas du tout sur internet. Il fonctionne sur l'intranet du parc, accessible uniquement depuis l'intérieur du réseau — et le contrôle le plus efficace contre un attaquant distant est simplement qu'il n'existe aucune porte publique à essayer. L'administration, le seul accès qui l'atteint de l'extérieur, passe par un VPN configuré sur le routeur MikroTik : même moi, j'y accède par un tunnel authentifié plutôt que par un port exposé. Un système RH inaccessible depuis internet ne peut pas être compromis depuis internet.",
        ],
      },
      {
        heading: "La part qui n'est pas logicielle",
        body: [
          "Mettre le système en place était la moitié facile. La moitié difficile, c'est que quatre bureaux RH remplis de personnes devaient désormais l'utiliser correctement — et le maillon le plus faible d'un système contenant des données personnelles est rarement le serveur, ce sont les gens qui y saisissent.",
          "J'ai donc inscrit et formé les utilisateurs RH des quatre bureaux, et la formation ne portait pas seulement sur quel bouton fait quoi. Elle portait sur ce que sont réellement ces données, et sur ce qu'une fuite coûterait aux personnes qu'elles décrivent. Un système sûr par conception échoue quand même si quelqu'un s'envoie un tableur chez lui ; l'objectif de la formation était que chacun manipulant ces dossiers comprenne pourquoi les protections existent.",
        ],
      },
      {
        heading: "Relier les RH à la paie",
        body: [
          "Bright Industrial Park est à capitaux chinois, et le service financier gère la paie sur WeCom — la plateforme d'entreprise dans laquelle vit déjà l'essentiel de la société. Les RH et la paie décrivent les mêmes personnes sous deux angles : aujourd'hui, chaque employé est donc tenu à jour deux fois, une fois dans ERPNext, une fois dans WeCom.",
          "L'étape suivante consiste à relier les deux, afin qu'un employé créé ou modifié dans le système RH soit répercuté vers la paie sans nouvelle saisie. C'est le type d'intégration le plus intéressant — faire dialoguer un ERP open source et une suite d'entreprise chinoise qui n'ont jamais été conçus pour se parler — et le bénéfice est la suppression de la double saisie qui produit discrètement des écarts entre les RH et la finance.",
        ],
      },
      {
        heading: "Ce que je referais autrement",
        body: [
          "La force de la conception est aussi son risque : l'accès dépend d'un seul administrateur joignable par un seul VPN. C'est exactement le contrôle que je voulais pour la sécurité, mais c'est un point de défaillance unique côté exploitation — si je suis indisponible et que le chemin d'administration casse, personne d'autre ne peut entrer pour le réparer. Un second administrateur formé et une procédure de reprise documentée conserveraient la posture de sécurité sans faire reposer toute l'exploitation sur une seule personne.",
          "Les sauvegardes méritent le même sérieux que le système en production. Une copie d'une base de données personnelles de 8 000 personnes est exactement aussi sensible que l'originale : elle doit être chiffrée, à accès contrôlé, et — la partie facile à négliger — réellement testée en restauration plutôt que supposée fonctionner.",
        ],
      },
    ],
  },
  "diagnosing-fibre-latency": {
    title: "Trouver une panne là où personne ne cherchait",
    summary:
      "Dans un parc de cette taille, « internet est lent » ne veut presque jamais dire ce qu'il annonce. La fibre ajoute une latence infime ; la panne, c'est un connecteur sale, un SFP défaillant, une boucle de commutation, un câble trop courbé. Une méthode pour diagnostiquer par couches plutôt que par l'intuition la plus bruyante.",
    role: "Chargé de support informatique",
    outcomes: [
      "de délai que la fibre ajoute au km",
      "où se trouve presque toujours la panne",
      "pannes diagnostiquées à l'intuition",
    ],
    sections: [
      {
        heading: "Pourquoi la fibre n'est presque jamais la cause",
        body: [
          "La fibre optique ajoute environ cinq microsecondes de délai par kilomètre. À l'échelle d'un parc, c'est négligeable — la fibre n'est presque jamais la cause d'une plainte de latence, quoi que dise la plainte. Ce qui me parvient, c'est un symptôme : « internet est lent », « l'ERP se déconnecte sans arrêt », « la vidéosurveillance se fige toutes les quelques secondes ». La panne, elle, se trouve tout autre part.",
          "Ce « tout autre part » est le plus souvent la couche physique — un connecteur sale, un transceiver défaillant, une fibre trop courbée ou sectionnée par une pelleteuse, une soudure qui dérive en chauffant. Parfois c'est une couche au-dessus : un défaut de duplex, un lien saturé, une boucle de commutation, un port sur le mauvais VLAN. La panne est rarement là où pointe la plainte, et le travail consiste à la trouver sans se laisser conduire par l'intuition la plus bruyante.",
        ],
      },
      {
        heading: "Remonter depuis le bas",
        body: [
          "La discipline consiste à diagnostiquer par couches, en partant de la couche physique, et à mesurer à chaque étape plutôt qu'à supposer. La première question est celle de l'étendue — un poste, un bâtiment, ou tout le parc — car elle écarte à elle seule la moitié des possibilités avant même de sortir un outil.",
          "Ensuite, c'est de la mesure, pas de l'opinion. Un ping continu vers la passerelle distingue une panne locale d'un problème WAN et montre si la perte est constante ou survient en charge. Les compteurs d'interface du commutateur — erreurs CRC, paquets rejetés en réception, battements d'interface — désignent la couche 1 dès qu'ils grimpent. La puissance optique dit le reste : un niveau de réception sain se situe autour de -8 à -15 dBm, et une valeur de -20 dBm est un bilan de liaison qui s'effondre discrètement. Un iperf sur le LAN sépare un plafond de bande passante d'un problème de latence. Chaque mesure valide ou écarte une couche, si bien qu'au moment où je touche enfin à la fibre, je sais déjà que c'est la fibre.",
        ],
      },
      {
        heading: "La panne qu'un nettoyage de trente secondes règle",
        body: [
          "Un bâtiment signale l'ERP qui décroche et la vidéosurveillance qui saccade. Un ping vers la passerelle affiche une ou deux millisecondes, puis un pic à 350 et un délai dépassé, puis revient à la normale — la signature d'un lien qui perd des trames, non d'une application qui défaille. Le commutateur le confirme : erreurs CRC et rejets en réception qui grimpent sur ce seul port, ce qui place la panne en couche 1 et écarte le routage et les VLAN.",
          "La puissance optique lit -20 dBm en réception, bien en deçà de la fenêtre saine. La cause se révèle presque banale — un connecteur LC sale, une poussière sur une extrémité de fibre, large d'une fraction de cheveu, suffisante pour diffuser la lumière. Un nettoyeur « one-click », une inspection au microscope, on rebranche, et la puissance de réception remonte à -10 dBm, la latence avec elle. Cela ressemblait à un bug logiciel pendant une semaine, et ce n'était qu'une trace.",
        ],
      },
      {
        heading: "Quand il faut localiser la rupture",
        body: [
          "Toutes les pannes ne sont pas aussi douces. Une usine entière tombe d'un coup — lien coupé, aucune lumière sur le transceiver. Ce n'est pas une dégradation, c'est une rupture, et la seule question est : où ? Un localisateur visuel de défaut, un laser rouge envoyé dans la fibre, la révèle en train de rougeoyer à mi-parcours dans le fourreau, là où une pelleteuse creusant une tranchée de route avait traversé le câble. Une soudure par fusion, un nouveau test, et l'usine est de retour.",
          "La version plus subtile, c'est la soudure qui tient le matin et lâche dans la chaleur de l'après-midi, ou la fibre serrée fort autour d'un poteau métallique dont la puissance de réception faiblit et se rétablit au gré des flexions. Celles-là n'apparaissent jamais comme une rupture nette ; elles apparaissent comme une perte, et c'est un OTDR qui les trouve — un pic de 2,4 dB à 320 mètres là où la trace devrait afficher une valeur négligeable, désignant la soudure exacte à refaire.",
        ],
      },
      {
        heading: "La boucle qui fait tout tomber",
        body: [
          "Les pannes qui ne restent pas dans un seul bâtiment sont les pires. Le parc entier devient inutilisable d'un coup, le processeur de chaque commutateur collé au plafond, le réseau noyé sous le trafic de diffusion. Ce schéma a une cause habituelle — une boucle. Quelqu'un a relié deux ports de commutateur l'un à l'autre, souvent en rangeant innocemment une armoire, et le réseau fait désormais tourner les mêmes trames en anneau sans fin.",
          "Le spanning tree la trahit par des changements de topologie incessants. Retirer le câble de la boucle y met fin, mais le vrai correctif est la protection qui aurait dû empêcher un seul cordon de devenir une panne à l'échelle du parc : RSTP avec BPDU guard et protection contre les boucles, pour que le commutateur ferme le port fautif au lieu de laisser un câble faire tomber le réseau de huit mille personnes.",
        ],
      },
      {
        heading: "Ce que je referais autrement",
        body: [
          "Presque toutes ces pannes sont visibles avant que l'utilisateur ne les ressente. Un connecteur ne lâche pas d'un coup — sa puissance de réception dérive vers le bas sur plusieurs jours. Une soudure qui cède à la chaleur est marginale depuis des semaines. La plus grande amélioration serait de superviser la couche physique : puissance optique et compteurs d'erreurs d'interface, avec une alerte lorsqu'un lien franchit un seuil, pour qu'un port glissant vers -18 dBm ouvre un ticket avant de perdre une trame.",
          "Cela fait passer l'ensemble du réactif au proactif — au lieu de diagnostiquer une panne après que la vidéosurveillance s'est figée, on remplace un connecteur un mardi parce qu'un graphique l'a signalé. La méthode décrite ici sert à trouver une panne une fois qu'elle est survenue ; l'intérêt de la supervision, c'est d'en avoir besoin moins souvent.",
        ],
      },
    ],
  },
};
