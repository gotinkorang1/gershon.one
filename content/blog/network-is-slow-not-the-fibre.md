---
title: Your network is slow, and it's probably not the fibre
date: 2026-08-01
summary: A short field note on why latency complaints in a large network almost never point at the fibre — and the order I actually check things in.
tags: [Networking, Fibre, Troubleshooting]
draft: false
---

When someone says the network is slow, they are usually pointing at the wrong thing. Optical fibre adds about **five microseconds of delay per kilometre** — across a whole industrial park, that is nothing. So "the fibre is slow" is almost never the fibre.

What people report is a symptom. What you are looking for is a cause, and it is usually somewhere else entirely: a dirty connector, a failing transceiver, a switching loop, a duplex mismatch, a port on the wrong VLAN.

## Measure, don't guess

The habit that saves the most time is refusing to act on suspicion. Before touching anything, I answer two questions:

- **What is the scope?** One PC, one building, or the whole park? That alone rules out half the possibilities.
- **Is it steady or bursty?** A continuous ping to the gateway shows whether the loss is constant or only spikes under load.

```
ping 10.10.0.1 -t
```

If that ping is mostly 1–2 ms with the occasional 350 ms spike and a timeout, that is not an application failing — that is a link shedding frames.

## Work up from the bottom

From there it is the physical layer first. The switch's own interface counters — CRC errors, receive drops — point straight at Layer 1 the moment they start climbing. Optical power tells the rest:

> A healthy receive level sits around −8 to −15 dBm. A reading of −20 dBm is a light budget quietly falling apart — often just a dirty LC connector.

More often than not, the fix is a thirty-second clean with a one-click cleaner, and the "software bug" everyone chased for a week turns out to have been a smudge on a fibre end face.

## The takeaway

Diagnose by layer, measure at every step, and let the readings — not the loudest complaint — tell you where the fault is. By the time you actually touch the fibre, you should already know it is the fibre.

More on the tools and the harder faults — broken fibre, OTDR traces, spanning-tree loops — is in the [case study](/work/diagnosing-fibre-latency).
