MODULUS

Modulus measures how on-chain systems behave under state change.

Modulus is a modular observability framework that captures, compares, and describes real-time dynamics of on-chain liquidity systems. It operates without prediction, scoring, or persistence.

What Modulus Does v0

At each observation tick, Modulus fetches live on-chain state from supported chains and venues. It computes deterministic liquidity metrics and compares the current state against the previous observation. It emits raw metric values along with a short human-readable annotation describing what changed.

All behavior is derived directly from on-chain data. There are no synthetic baselines, no alerts, and no interpretation layers in v0.

Core Metrics v0

Liquidity Depth represents total available liquidity near the active price.

Liquidity Elasticity represents the response of liquidity to price movement between consecutive observations. Elasticity is undefined when no price change occurs.

Liquidity Fragmentation represents the degree to which liquidity is distributed across discrete ranges.

Liquidity Degradation represents a qualitative system regime derived from structural changes, such as STABLE or STRESSED.

Transition Annotations v0

In addition to raw metrics, Modulus v0 annotates each transition with a concise description of what changed between observations. These annotations are deterministic, ephemeral, derived only from consecutive observations, and discarded on process restart. They do not modify or reinterpret metrics.

Architecture Overview

Modulus processes data through live chains, chain adapters, a metrics engine, an integration runtime with ephemeral state and annotations, and a read-only dashboard.

Design Properties

Modulus v0 has no long-term storage. It does not perform historical backfilling. It does not generate predictions or alerts. The dashboard is strictly read-only and passive.

Supported Chains v0

Modulus v0 supports Arbitrum using Uniswap v3 and Optimism using Uniswap v3.

v0 Scope

Modulus v0 includes live on-chain ingestion, deterministic metric computation, consecutive-state comparison, transition annotation, and a human-readable dashboard.

Modulus v0 excludes persistent storage, event replay, alerting, scoring, forecasting, and user-defined thresholds.

Status

v0 is complete.

Modulus v0 provides a truthful, real-time view of on-chain system dynamics and establishes a clean foundation for future versions that introduce memory, event comparison, and long-horizon analysis.

Looking Ahead

Future versions may add persistent state storage, cross-event comparison, historical regime analysis, and user-defined system tracking. These are intentionally deferred to preserve clarity and correctness in v0.
