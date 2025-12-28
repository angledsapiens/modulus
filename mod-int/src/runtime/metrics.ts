import { CanonicalLiquiditySnapshot } from "../../../mod-eng-02-chain-adapters/src/types";

import {
  LiquiditySnapshot,
  LiquidityDepthInput,
  LiquidityElasticityInput,
  LiquidityFragmentationInput,
  LiquidityDegradationTrendInput
} from "../../../mod-eng-01-metrics/src/inputs";

import { MetricContext } from "../../../mod-eng-01-metrics/src/types";

import { computeLiquidityDepth } from "../../../mod-eng-01-metrics/src/metrics/depth";
import { computeLiquidityElasticity } from "../../../mod-eng-01-metrics/src/metrics/elasticity";
import { computeLiquidityFragmentation } from "../../../mod-eng-01-metrics/src/metrics/fragmentation";
import { computeLiquidityDegradationTrend } from "../../../mod-eng-01-metrics/src/metrics/degradation";

import { MetricMeta } from "../../../mod-eng-01-metrics/src/types";

function buildMeta(metric: string): MetricMeta {
  return {
    metric,
    version: "v0",
    computedAt: Date.now()
  };
}

/**
 * Canonical → Metrics snapshot adapter
 */
function adaptSnapshot(
  snapshot: CanonicalLiquiditySnapshot
): LiquiditySnapshot {
  return {
    ts: snapshot.ts,
    levels: snapshot.levels.map(level => ({
      price: level.price,
      liquidity: Number(level.liquidity)
    }))
  };
}

/**
 * Build MetricContext from snapshot
 */
function buildContext(
  snapshot: CanonicalLiquiditySnapshot
): MetricContext {
  return {
    chain: snapshot.chain,
    venue: snapshot.venue,
    asset: snapshot.asset
  };
}

export function runMetrics(snapshot: CanonicalLiquiditySnapshot) {
  const context = buildContext(snapshot);
  const adapted = adaptSnapshot(snapshot);

  const depthInput: LiquidityDepthInput = {
    context,
    snapshot: adapted,
    priceBandPct: 0.02
  };

  const fragmentationInput: LiquidityFragmentationInput = {
    context,
    snapshot: adapted
  };

  const elasticityInput: LiquidityElasticityInput = {
    context,
    before: adapted,
    after: adapted,
    priceShockPct: 0
  };

  const degradationInput: LiquidityDegradationTrendInput = {
    context,
    series: [adapted],
    windowSize: 1
  };

  return {
    depth: computeLiquidityDepth(
      depthInput,
      buildMeta("liquidity_depth")
    ),

    elasticity: computeLiquidityElasticity(
      elasticityInput,
      buildMeta("liquidity_elasticity")
    ),

    fragmentation: computeLiquidityFragmentation(
      fragmentationInput,
      buildMeta("liquidity_fragmentation")
    ),

    degradation: computeLiquidityDegradationTrend(
      degradationInput,
      buildMeta("liquidity_degradation")
    )
  };
}
