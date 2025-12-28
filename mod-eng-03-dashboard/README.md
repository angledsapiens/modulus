# MOD-ENG-03 — Dashboard

Human-facing dashboard for the Modulus project.

---

## Purpose

MOD-ENG-03 renders **existing metric outputs** emitted by the Modulus runtime for human inspection.

It answers one question only:

> **What is the current on-chain system response under state changes?**

---

## Scope

This module:

- Consumes structured metric snapshots emitted by `MOD-INT`
- Displays the latest system state for a given `(chain, venue, asset)`
- Visualizes recent metric behavior over time
- Preserves v0 Liquidity Elasticity semantics, including undefined values

This module does **not** compute, interpret, predict, alert, or store data.

---

## Data Contract

The dashboard consumes arrays of metric snapshots:

```ts
type MetricSnapshot = {
  ts: number;
  chain: string;
  venue: string;
  asset: string;
  metrics: {
    liquidity_depth?: number;
    liquidity_elasticity?: number; // may be undefined / NaN
    liquidity_fragmentation?: number;
  };
};
```
