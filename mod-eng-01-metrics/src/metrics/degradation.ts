// src/metrics/degradation.ts

import {
  LiquidityDegradationTrendInput
} from "../inputs";

import {
  LiquidityDegradationTrendOutput,
  DegradationState
} from "../outputs";

import {
  MetricMeta
} from "../types";

/**
 * Compute Liquidity Degradation Trend
 *
 * slope = (last_total - first_total) / N
 *
 * State mapping:
 *  - slope > 0  → IMPROVING
 *  - slope = 0  → STABLE
 *  - slope < 0  → DEGRADING
 *
 * Pure function.
 */
export function computeLiquidityDegradationTrend(
  input: LiquidityDegradationTrendInput,
  meta: MetricMeta
): LiquidityDegradationTrendOutput {

  const series = input.series;

  if (series.length === 0) {
    return {
      meta,
      slope: 0,
      state: "STABLE"
    };
  }

  const totals: number[] = [];

  for (const snapshot of series) {
    let total = 0;
    for (const level of snapshot.levels) {
      total += level.liquidity;
    }
    totals.push(total);
  }

  const first = totals[0];
  const last = totals[totals.length - 1];
  const n = totals.length;

  const slope = (last - first) / n;

  let state: DegradationState = "STABLE";
  if (slope > 0) state = "IMPROVING";
  if (slope < 0) state = "DEGRADING";

  return {
    meta,
    slope,
    state
  };
}
