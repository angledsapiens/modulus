// tests/run.ts

import {
  computeLiquidityDepth,
  computeLiquidityElasticity,
  computeLiquidityFragmentation,
  computeLiquidityDegradationTrend,
  LiquiditySnapshot,
  MetricMeta
} from "../src";

/* ======================================
   Shared test metadata
   ====================================== */

const META: MetricMeta = {
  metric: "test",
  version: "v0",
  computedAt: 0
};

/* ======================================
   Liquidity Depth Test
   ====================================== */

(() => {
  const snapshot: LiquiditySnapshot = {
    ts: 0,
    levels: [
      { price: 90, liquidity: 10 },
      { price: 100, liquidity: 20 },
      { price: 110, liquidity: 30 }
    ]
  };

  const out = computeLiquidityDepth(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      snapshot,
      priceBandPct: 0.1
    },
    META
  );

  if (out.depth !== 60) {
    throw new Error(`Depth test failed: expected 60, got ${out.depth}`);
  }
})();

/* ======================================
   Liquidity Elasticity Sign Test
   ====================================== */

(() => {
  const before: LiquiditySnapshot = {
    ts: 0,
    levels: [{ price: 100, liquidity: 100 }]
  };

  const after: LiquiditySnapshot = {
    ts: 1,
    levels: [{ price: 100, liquidity: 80 }]
  };

  const out = computeLiquidityElasticity(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      before,
      after,
      priceShockPct: -0.02
    },
    META
  );

  if (out.elasticity !== 1000) {
    throw new Error(
      `Elasticity test failed: expected 1000, got ${out.elasticity}`
    );
  }
})();

/* ======================================
   Liquidity Fragmentation Tests
   ====================================== */

/* Single dominant level → 0 */
(() => {
  const snapshot: LiquiditySnapshot = {
    ts: 0,
    levels: [{ price: 100, liquidity: 1000 }]
  };

  const out = computeLiquidityFragmentation(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      snapshot
    },
    META
  );

  if (out.fragmentationIndex !== 0) {
    throw new Error(
      `Fragmentation single-level failed: got ${out.fragmentationIndex}`
    );
  }
})();

/* Uniform distribution → 0.75 */
(() => {
  const snapshot: LiquiditySnapshot = {
    ts: 0,
    levels: [
      { price: 90, liquidity: 25 },
      { price: 100, liquidity: 25 },
      { price: 110, liquidity: 25 },
      { price: 120, liquidity: 25 }
    ]
  };

  const out = computeLiquidityFragmentation(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      snapshot
    },
    META
  );

  if (Math.abs(out.fragmentationIndex - 0.75) > 1e-9) {
    throw new Error(
      `Fragmentation uniform failed: got ${out.fragmentationIndex}`
    );
  }
})();

/* ======================================
   Liquidity Degradation Trend Tests
   ====================================== */

(() => {
  const makeSnapshot = (liquidity: number): LiquiditySnapshot => ({
    ts: 0,
    levels: [{ price: 100, liquidity }]
  });

  const improving = computeLiquidityDegradationTrend(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      series: [
        makeSnapshot(100),
        makeSnapshot(120),
        makeSnapshot(140)
      ],
      windowSize: 3
    },
    META
  );

  if (improving.state !== "IMPROVING") {
    throw new Error(`Trend improving failed`);
  }

  const stable = computeLiquidityDegradationTrend(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      series: [
        makeSnapshot(100),
        makeSnapshot(100)
      ],
      windowSize: 2
    },
    META
  );

  if (stable.state !== "STABLE") {
    throw new Error(`Trend stable failed`);
  }

  const degrading = computeLiquidityDegradationTrend(
    {
      context: { asset: "ETH", venue: "test", chain: "test" },
      series: [
        makeSnapshot(140),
        makeSnapshot(120),
        makeSnapshot(100)
      ],
      windowSize: 3
    },
    META
  );

  if (degrading.state !== "DEGRADING") {
    throw new Error(`Trend degrading failed`);
  }
})();

/* ======================================
   Success
   ====================================== */

console.log("✅ All MOD-ENG-01 v0 tests passed");
