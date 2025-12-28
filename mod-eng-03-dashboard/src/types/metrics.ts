export type MetricSnapshot = {
  ts: number;
  chain: string;
  venue: string;
  asset: string;

  metrics: {
    liquidity_depth?: number;
    liquidity_elasticity?: number; // may be NaN
    liquidity_fragmentation?: number;
  };
};
