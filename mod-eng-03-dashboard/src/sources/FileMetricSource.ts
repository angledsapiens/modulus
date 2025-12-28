import type { MetricSource } from "../data/MetricSource";
import type { MetricSnapshot } from "../types/metrics";

export class FileMetricSource implements MetricSource {
  private url: string;
  private intervalMs: number;

  constructor(url: string, intervalMs = 2000) {
    this.url = url;
    this.intervalMs = intervalMs;
  }

  subscribe(onData: (snapshots: MetricSnapshot[]) => void): void {
    setInterval(async () => {
      const res = await fetch(this.url);
      const data = await res.json();
      onData(data as MetricSnapshot[]);
    }, this.intervalMs);
  }
}
