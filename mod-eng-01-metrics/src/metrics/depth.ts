// src/metrics/depth.ts

import {
  LiquidityDepthInput
} from "../inputs";

import {
  LiquidityDepthOutput
} from "../outputs";

import {
  MetricMeta
} from "../types";

/**
 * Compute Liquidity Depth
 *
 * Pure function:
 * - No RPC
 * - No time fetching
 * - No side effects
 */
export function computeLiquidityDepth(
  input: LiquidityDepthInput,
  meta: MetricMeta
): LiquidityDepthOutput {

  const levels = input.snapshot.levels;

  if (levels.length === 0) {
    return {
      meta,
      depth: 0
    };
  }

  const midIndex = Math.floor(levels.length / 2);
  const midPrice = levels[midIndex].price;

  const lower = midPrice * (1 - input.priceBandPct);
  const upper = midPrice * (1 + input.priceBandPct);

  let depth = 0;

  for (const level of levels) {
    if (level.price >= lower && level.price <= upper) {
      depth += level.liquidity;
    }
  }

  return {
    meta,
    depth
  };
}
