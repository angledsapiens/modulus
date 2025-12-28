import type { MetricSnapshot } from "../types/metrics";

export interface MetricSource {
  subscribe(
    onData: (snapshots: MetricSnapshot[]) => void
  ): void;
}
