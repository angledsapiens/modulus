import type { MetricSource } from "../data/MetricSource";
import type { MetricSnapshot } from "../types/metrics";

export class FileMetricSource implements MetricSource {
  private url: string;
  private intervalMs: number;
  private snapshots: MetricSnapshot[] = [];

  constructor(url: string, intervalMs = 2000) {
    this.url = url;
    this.intervalMs = intervalMs;
  }

  subscribe(onData: (snapshots: MetricSnapshot[]) => void): void {
    const poll = async () => {
      try {
        const res = await fetch(this.url, { cache: "no-store" });
        const data = await res.json();

        if (!data || typeof data !== "object" || typeof data.ts !== "number") {
          return;
        }

        const snapshot = data as MetricSnapshot;

        const last = this.snapshots[this.snapshots.length - 1];

        // Avoid duplicate timestamps
        if (last && last.ts === snapshot.ts) {
          return;
        }

        this.snapshots = [...this.snapshots, snapshot];
        onData(this.snapshots);
      } catch {
        // swallow errors, preserve last known good state
      }
    };

    poll();
    setInterval(poll, this.intervalMs);
  }
}
