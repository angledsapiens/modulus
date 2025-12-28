import type { MetricSnapshot } from "../types/metrics";

type MetricKind = "depth" | "elasticity" | "fragmentation";

type Props = {
  title: string;
  metric: MetricKind;
  snapshots: MetricSnapshot[];
};

export default function MetricStateCard({ title, metric, snapshots }: Props) {
  const latest = snapshots[snapshots.length - 1];
  const prev =
    snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;

  let value: number | null = null;
  let prevValue: number | null = null;

  switch (metric) {
    case "depth":
      value = latest.metrics.depth.depth;
      prevValue = prev?.metrics.depth.depth ?? null;
      break;

    case "elasticity":
      value = latest.metrics.elasticity.elasticity;
      prevValue = prev?.metrics.elasticity.elasticity ?? null;
      break;

    case "fragmentation":
      value = latest.metrics.fragmentation.fragmentationIndex;
      prevValue = prev?.metrics.fragmentation.fragmentationIndex ?? null;
      break;
  }

  const regime = latest.metrics.degradation?.state ?? "STABLE";

  let deltaText = "—";
  if (value !== null && prevValue !== null) {
    const delta = value - prevValue;
    if (delta === 0) {
      deltaText = "no change";
    } else if (delta > 0) {
      deltaText = `▲ ${delta}`;
    } else {
      deltaText = `▼ ${Math.abs(delta)}`;
    }
  }

  let valueText = "—";
  if (value !== null) {
    valueText = value.toLocaleString();
  }

  return (
    <section className="card metric-state-card">
      <div className="card-header">
        <h3>{title}</h3>
        <span className={`regime regime-${regime.toLowerCase()}`}>
          {regime}
        </span>
      </div>

      <div className="metric-value">
        {valueText}
      </div>

      <div className="metric-delta">
        Δ since last update: {deltaText}
      </div>

      <div className="metric-meta">
        Last updated: {new Date(latest.ts).toUTCString()}
      </div>
    </section>
  );
}
