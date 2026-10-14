---
title: Deux cartes d'identité par feuille A4, directement depuis ERPNext
date: 2026-08-02
summary: Un format d'impression qui transforme les dossiers d'employés ERPNext en cartes d'identité finies, recto verso — deux par feuille — sans outil de conception externe.
cover: /erpnext-id-cards-cover.webp
tags: [ERPNext, Jinja, RH, Impression]
draft: false
---

Le personnel avait besoin de cartes d'identité, et les dossiers d'employés existaient déjà dans ERPNext — noms, photos, services, fonctions. Les données n'ont jamais été le problème ; les faire passer sur une carte physique, si. Les solutions habituelles consistent à commander une conception de carte, où chaque modification se paie et dépend de quelqu'un d'autre, ou à acheter un logiciel d'impression de cartes. Les deux paraissaient lourdes pour ce qui est, au fond, un travail de mise en forme.

Je l'ai donc intégré à ERPNext lui-même : un format d'impression qui lit le dossier d'un employé et compose une carte complète — recto et verso — prête à imprimer, découper et plastifier. Nouvelle embauche, on imprime une carte. Changement de service, on imprime une carte. Aucun aller-retour de conception.

![Une carte générée, recto](/sample-id-1.webp) ![Une carte générée, verso](/sample-id-2.webp)

## Ce qu'il produit

Chaque carte porte ce qu'un agent à l'entrée doit réellement vérifier, tiré en direct du dossier de l'employé :

- **Recto :** un en-tête aux couleurs de l'entreprise, la photo de l'employé, les informations clés — nom, numéro d'identification, fonction, service — une ligne de signature autorisée et un léger filigrane.
- **Verso :** le logo de l'entreprise, les coordonnées et un code QR.

Deux cartes complètes s'impriment sur une seule feuille A4 : une page donne une carte complète une fois découpée et plastifiée — ce qui divise le papier par deux et garde les lots ordonnés.

## Comment il est construit

Le tout est un format d'impression ERPNext standard : Jinja pour les données côté serveur, HTML pour la structure, CSS pour la mise en page. Rien d'exotique — le savoir-faire consiste à faire produire une *carte* plutôt qu'une *page* à un moteur PDF basé sur un navigateur.

Cela voulait dire travailler en centimètres et non en pixels, pour que les dimensions survivent au passage sur une feuille physique ; déclarer la page en A4 sans marge ; et répéter le balisage de la carte pour que la paire ne soit jamais coupée entre deux pages. L'ensemble est assez modulaire pour qu'un changement d'image de marque — nouveau logo, autres couleurs — soit une petite modification plutôt qu'une refonte.

Deux choses qui paraissent anodines et ne le sont pas : des photos d'employés qui s'affichent bien dans l'aperçu mais arrivent vides dans le PDF (la solution consiste à passer l'image par le filtre `abs_url` de Frappe pour obtenir un chemin absolu), et obtenir une mise en page identique entre l'aperçu d'impression d'ERPNext et son moteur PDF.

## Pourquoi c'est utile

Les RH peuvent désormais produire à la demande des cartes professionnelles et cohérentes, directement depuis le système qui contient déjà les données — sans outil de conception externe, sans logiciel tiers, sans attente. Le résultat s'adapte aux imprimantes de cartes PVC, aux imprimantes laser ordinaires et à l'export PDF simple, selon ce dont le bureau dispose réellement.

Le modèle, les styles et les instructions d'installation sont sur [GitHub](https://github.com/gotinkorang1/erpnext-id-card-print-format).

Pour la partie la plus difficile de l'histoire — pourquoi chaque libellé devait apparaître en deux langues, et les problèmes d'impression qui ont façonné toute la mise en page — j'en ai fait une étude de cas : [Des cartes d'identité sur lesquelles deux langues devaient s'accorder](/fr/work/erpnext-bilingual-id-cards).
