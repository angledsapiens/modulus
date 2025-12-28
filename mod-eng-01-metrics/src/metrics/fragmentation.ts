// src/metrics/fragmentation.ts

import {
  LiquidityFragmentationInput
} from "../inputs";

import {
  LiquidityFragmentationOutput
} from "../outputs";

import {
  MetricMeta
} from "../types";

/**
 * Compute Liquidity Fragmentation Index
 *
 * fragmentationIndex = 1 - Σ (liquidity_i / total)^2
 *
 * Pure function:
 * - Deterministic
 * - Bounded [0,1]
 */
export function computeLiquidityFragmentation(
  input: LiquidityFragmentationInput,
  meta: MetricMeta
): LiquidityFragmentationOutput {

  const levels = input.snapshot.levels;

  if (levels.length === 0) {
    return {
      meta,
      fragmentationIndex: 0
    };
  }

  let totalLiquidity = 0;
  for (const l of levels) {
    totalLiquidity += l.liquidity;
  }

  if (totalLiquidity === 0) {
    return {
      meta,
      fragmentationIndex: 0
    };
  }

  let hhi = 0;

  for (const l of levels) {
    const share = l.liquidity / totalLiquidity;
    hhi += share * share;
  }

  const fragmentationIndex = 1 - hhi;

  return {
    meta,
    fragmentationIndex
  };
}
