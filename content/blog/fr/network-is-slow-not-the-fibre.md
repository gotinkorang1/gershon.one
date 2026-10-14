---
title: Votre réseau est lent, et ce n'est probablement pas la fibre
date: 2026-08-01
summary: Une courte note de terrain sur les raisons pour lesquelles les plaintes de latence dans un grand réseau ne visent presque jamais la fibre — et l'ordre dans lequel je vérifie réellement les choses.
description: Pourquoi les plaintes de latence dans un grand réseau ne visent presque jamais la fibre, et l'ordre dans lequel je vérifie réellement les choses.
cover: /network-latency-cover.webp
tags: [Réseaux, Fibre, Dépannage]
draft: false
---

Quand quelqu'un dit que le réseau est lent, il pointe généralement la mauvaise chose. La fibre optique ajoute environ **cinq microsecondes de délai par kilomètre** — à l'échelle d'un parc industriel entier, c'est négligeable. Donc « la fibre est lente », ce n'est presque jamais la fibre.

Ce que les gens signalent, c'est un symptôme. Ce que l'on cherche, c'est une cause, et elle se trouve généralement ailleurs : un connecteur sale, un transceiver défaillant, une boucle de commutation, un mauvais duplex, un port sur le mauvais VLAN.

## Mesurer, ne pas deviner

L'habitude qui fait gagner le plus de temps, c'est de refuser d'agir sur un soupçon. Avant de toucher à quoi que ce soit, je réponds à deux questions :

- **Quel est le périmètre ?** Un poste, un bâtiment ou tout le parc ? Cela seul élimine la moitié des possibilités.
- **Est-ce constant ou par rafales ?** Un ping continu vers la passerelle montre si la perte est permanente ou ne survient qu'en charge.

```
ping 10.10.0.1 -t
```

Si ce ping tourne surtout autour de 1 à 2 ms avec un pic occasionnel à 350 ms et un délai d'attente dépassé, ce n'est pas une application qui flanche — c'est un lien qui perd des trames.

## Remonter depuis la couche physique

À partir de là, c'est d'abord la couche physique. Les compteurs d'interface du commutateur lui-même — erreurs CRC, pertes en réception — désignent directement la couche 1 dès qu'ils commencent à grimper. La puissance optique dit le reste :

> Un niveau de réception sain se situe autour de −8 à −15 dBm. Une lecture à −20 dBm, c'est un bilan optique qui se dégrade sans bruit — souvent juste un connecteur LC sale.

Le plus souvent, la solution est un nettoyage de trente secondes avec un nettoyeur à un clic, et le « bogue logiciel » que tout le monde a poursuivi pendant une semaine s'avère être une trace sur la face d'une fibre.

## À retenir

Diagnostiquez par couche, mesurez à chaque étape, et laissez les mesures — pas la plainte la plus bruyante — vous dire où se trouve la panne. Au moment où vous touchez enfin la fibre, vous devriez déjà savoir que c'est la fibre.

Les outils et les pannes plus difficiles — fibre coupée, traces OTDR, boucles de spanning tree — sont décrits dans l'[étude de cas](/fr/work/diagnosing-fibre-latency).
