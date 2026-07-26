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
  "dual-wan-starlink-failover": {
    title: "Bascule automatique entre la fibre et Starlink",
    summary:
      "Un lien fibre unique mettait l'entreprise hors ligne à chaque coupure. Le routage double-WAN sous RouterOS bascule le trafic vers Starlink sans intervention humaine.",
    role: "Chargé de support informatique",
    outcomes: ["TODO — temps de bascule mesuré", "TODO — disponibilité depuis le déploiement", "Aucune intervention manuelle requise"],
    sections: [
      {
        heading: "Le problème",
        body: [
          "Le bureau reposait sur une seule connexion fibre. À chaque rupture du câble — assez fréquente pour poser problème — tout s'arrêtait : l'ERP, la messagerie, la liaison de vidéosurveillance et tout travail d'ingénierie dépendant de l'accès aux fichiers.",
          "La reprise exigeait qu'une personne bascule physiquement vers une connexion de secours. Cette personne, c'était généralement moi, et rarement au bon moment. Le délai entre la panne et sa détection dépassait souvent la bascule elle-même.",
          "TODO : indiquer la fréquence des pannes et leur coût approximatif en heures de travail perdues. Des chiffres concrets donnent du poids à cette section.",
        ],
      },
      {
        heading: "Pourquoi ne pas simplement ajouter une seconde fibre",
        body: [
          "Une seconde liaison fibre chez un autre fournisseur aurait été la réponse classique, mais les deux auraient probablement partagé une partie du tracé physique : une seule pelleteuse pouvait donc couper les deux. C'était aussi l'option la plus coûteuse.",
          "Starlink élimine complètement le problème du tracé partagé. Une liaison satellite tombe pour des raisons entièrement différentes d'une fibre enterrée, et c'est précisément la propriété recherchée pour un lien de secours.",
        ],
      },
      {
        heading: "Fonctionnement de la bascule",
        body: [
          "L'architecture repose sur un MikroTik CCR2004 sous RouterOS 7.x. Les deux WAN se terminent sur des ports distincts ; la fibre transporte tout le trafic par défaut et Starlink reste en attente avec une distance de route supérieure.",
          "La vérification de l'état du lien est l'élément déterminant. Surveiller l'interface ne suffit pas : une fibre peut rester électriquement active sans transporter le moindre paquet. Le routeur sonde donc une cible située au-delà de l'équipement du fournisseur, afin que le test échoue quand la connectivité réelle échoue, et non uniquement quand le câble est coupé.",
          "Lorsque les sondes échouent, la route de secours prend le relais et le trafic passe par Starlink. Dès que le lien principal se rétablit durablement, le trafic revient automatiquement.",
          "TODO : préciser votre intervalle de vérification, le seuil d'échec et la cible sondée. C'est le détail sur lequel un recruteur technique vous interrogera.",
        ],
      },
      {
        heading: "Segmentation et priorisation",
        body: [
          "La bascule seule aurait été une fausse économie. Starlink offre moins de marge que la fibre : basculer l'ensemble du trafic sans priorisation aurait dégradé l'ERP pendant que la vidéosurveillance saturait la liaison.",
          "Le trafic est réparti sur des VLAN — personnel, ERP, vidéosurveillance et invités — avec des files d'attente qui protègent l'ERP et le trafic du personnel lorsque le réseau fonctionne sur le lien de secours. Les invités et les caméras cèdent la priorité en premier.",
          "TODO : votre numérotation VLAN réelle et vos limites de file d'attente.",
        ],
      },
      {
        heading: "Ce que je ferais différemment",
        body: [
          "La configuration réside sur le routeur et fait l'objet de sauvegardes, mais elle n'est ni versionnée ni reproductible à partir de zéro. Si le matériel tombait en panne, la reconstruction consisterait à restaurer un fichier plutôt qu'à appliquer une configuration connue depuis une source.",
          "La supervision est également plus légère que je le souhaiterais. La bascule fonctionne, mais je l'apprends en le constatant, pas en étant alerté. Une alerte sur changement d'état comblerait cette lacune à peu de frais.",
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
