// src/types.ts

/**
 * Unix timestamp in milliseconds
 */
export type TimestampMs = number;

/**
 * Identifies the asset / venue / chain context
 * for which a metric is computed.
 */
export interface MetricContext {
  asset: string;   // e.g. "ETH", "USDC"
  venue: string;   // e.g. "uniswap-v3"
  chain: string;   // e.g. "arbitrum"
}

/**
 * Time window metadata (when applicable)
 */
export interface MetricWindow {
  startTs: TimestampMs;
  endTs: TimestampMs;
}

/**
 * Metadata attached to every metric output
 */
export interface MetricMeta {
  metric: string;
  version: "v0";
  computedAt: TimestampMs;
}
