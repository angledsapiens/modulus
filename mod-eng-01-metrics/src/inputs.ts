// src/inputs.ts

import { TimestampMs, MetricContext } from "./types";

/**
 * Single price level in a liquidity curve
 */
export interface LiquidityLevel {
  price: number;       // normalized price
  liquidity: number;   // absolute liquidity units
}

/**
 * Snapshot of liquidity at a point in time
 */
export interface LiquiditySnapshot {
  ts: TimestampMs;
  levels: LiquidityLevel[]; // ordered by price asc
}

/* ================================
   Metric-specific inputs
   ================================ */

/**
 * Liquidity Depth
 */
export interface LiquidityDepthInput {
  context: MetricContext;
  snapshot: LiquiditySnapshot;
  priceBandPct: number; // e.g. 0.01 = ±1%
}

/**
 * Liquidity Elasticity
 */
export interface LiquidityElasticityInput {
  context: MetricContext;
  before: LiquiditySnapshot;
  after: LiquiditySnapshot;
  priceShockPct: number; // signed %
}

/**
 * Liquidity Fragmentation Index
 */
export interface LiquidityFragmentationInput {
  context: MetricContext;
  snapshot: LiquiditySnapshot;
}

/**
 * Liquidity Degradation Trend
 */
export interface LiquidityDegradationTrendInput {
  context: MetricContext;
  series: LiquiditySnapshot[]; // ordered by ts asc
  windowSize: number;
}
