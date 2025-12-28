# MOD-ENG-01 — Metrics Engine

Liquidity metrics for the Modulus system.

## Purpose

This module defines the **authoritative, deterministic implementation**
of Modulus liquidity metrics. All downstream components (adapters,
dashboards, alerts, agents) must consume these metrics without modification.

This module is intentionally:

- Pure
- Chain-agnostic
- JSON-first
- Deterministic

## Metrics (v0)

Exactly four metrics are implemented:

1. Liquidity Depth
2. Liquidity Elasticity
3. Liquidity Fragmentation Index
4. Liquidity Degradation Trend

No more. No less.

## Design Principles

- No RPC calls
- No chain logic
- No time-fetching
- No side effects
- No implicit state

All inputs are normalized and passed in explicitly.
All outputs are serializable JSON objects.

## Non-Responsibilities

- Chain adapters
- Indexers
- Baseline modeling beyond simple slopes
- Dashboards or visualization
- Deployment

## Versioning

This module implements **metrics v0**.

Any changes to metric definitions, formulas, or semantics
require a **new major version** and a new module.

## Status

v0 complete and tested
