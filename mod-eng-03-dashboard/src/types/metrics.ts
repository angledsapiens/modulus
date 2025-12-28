export type MetricSnapshot = {
  chain: string;
  venue: string;
  asset: string;
  ts: number;

  metrics: {
    depth: {
      meta: {
        metric: string;
        version: string;
        computedAt: number;
      };
      depth: number;
    };

    elasticity: {
      meta: {
        metric: string;
        version: string;
        computedAt: number;
      };
      elasticity: number | null;
    };

    fragmentation: {
      meta: {
        metric: string;
        version: string;
        computedAt: number;
      };
      fragmentationIndex: number;
    };

    degradation?: {
      meta: {
        metric: string;
        version: string;
        computedAt: number;
      };
      slope: number;
      state: string;
    };
  };
};
