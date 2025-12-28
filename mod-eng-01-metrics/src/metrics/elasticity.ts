// src/metrics/elasticity.ts

import {
  LiquidityElasticityInput
} from "../inputs";

import {
  LiquidityElasticityOutput
} from "../outputs";

import {
  MetricMeta
} from "../types";

/**
 * Compute Liquidity Elasticity
 *
 * elasticity = ΔLiquidity / priceShockPct
 *
 * Pure function:
 * - No RPC
 * - No validation
 * - No side effects
 */
export function computeLiquidityElasticity(
  input: LiquidityElasticityInput,
  meta: MetricMeta
): LiquidityElasticityOutput {

  const sumLiquidity = (levels: { liquidity: number }[]) => {
    let total = 0;
    for (const l of levels) {
      total += l.liquidity;
    }
    return total;
  };

  const beforeTotal = sumLiquidity(input.before.levels);
  const afterTotal = sumLiquidity(input.after.levels);

  const deltaLiquidity = afterTotal - beforeTotal;
  const elasticity = deltaLiquidity / input.priceShockPct;

  return {
    meta,
    elasticity
  };
}
