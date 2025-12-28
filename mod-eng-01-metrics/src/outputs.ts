// src/outputs.ts

import { MetricMeta } from "./types";

/**
 * Liquidity Depth output
 */
export interface LiquidityDepthOutput {
  meta: MetricMeta;
  depth: number;
}

/**
 * Liquidity Elasticity output
 */
export interface LiquidityElasticityOutput {
  meta: MetricMeta;
  elasticity: number; // signed
}

/**
 * Liquidity Fragmentation output
 */
export interface LiquidityFragmentationOutput {
  meta: MetricMeta;
  fragmentationIndex: number; // ∈ [0,1]
}

/**
 * Liquidity Degradation Trend
 */
export type DegradationState =
  | "IMPROVING"
  | "STABLE"
  | "DEGRADING";

export interface LiquidityDegradationTrendOutput {
  meta: MetricMeta;
  slope: number;
  state: DegradationState;
}
