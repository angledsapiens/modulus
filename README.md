# MODULUS

> **Modular observability for on-chain liquidity dynamics.**

Modulus measures how on-chain systems behave under state change. It is a modular observability framework that captures, compares, and describes real-time dynamics of on-chain liquidity systems without prediction, scoring, or persistence.

---

## 🔍 What Modulus Does
At each observation tick, Modulus:
1. **Fetches** live on-chain state from supported chains and venues.
2. **Computes** deterministic liquidity metrics.
3. **Compares** the current state against the previous observation.
4. **Emits** raw metric values and short human-readable annotations.

*All behavior is derived directly from on-chain data. There are no synthetic baselines or interpretation layers in v0.*

## 📊 Core Metrics (v0)

| Metric | Description |
| :--- | :--- |
| **Liquidity Depth** | Total available liquidity near the active price. |
| **Liquidity Elasticity** | The response of liquidity to price movement between observations. |
| **Liquidity Fragmentation** | The degree to which liquidity is distributed across discrete ranges. |
| **Liquidity Degradation** | Qualitative system regimes derived from structural changes (e.g., `STABLE` or `STRESSED`). |

---

## 🛠 Architecture & Design
Modulus processes data through live chains, chain adapters, a metrics engine, an integration runtime with ephemeral state, and a read-only dashboard.

### Design Properties
* **No Persistence:** v0 has no long-term storage and does not perform historical backfilling.
* **Ephemeral Annotations:** Descriptions are derived only from consecutive observations and are discarded on process restart.
* **Passive Monitoring:** The dashboard is strictly read-only; Modulus does not generate alerts or forecasts.

### Supported Networks (v0)
* **Arbitrum** (Uniswap v3)
* **Optimism** (Uniswap v3)

---

## 📦 Scope

| Included in v0 | Excluded (Future) |
| :--- | :--- |
| Live on-chain ingestion | Persistent storage |
| Deterministic computation | Event replay |
| Consecutive-state comparison | Alerting & Forecasting |
| Dashboard | User-defined thresholds |

---

## 🚀 Status: v0 Complete
Modulus v0 provides a truthful, real-time view of on-chain system dynamics. It establishes a clean foundation for future versions that will introduce memory, event comparison, and long-horizon analysis.

---

## ⌨️ Future Work
Future versions may add persistent state storage and historical regime analysis.
