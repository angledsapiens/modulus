import type { MetricSnapshot } from "../types/metrics";

type Props = {
  snapshot: MetricSnapshot;
};

export default function CurrentState({ snapshot }: Props) {
  const { chain, venue, asset, ts, metrics } = snapshot;

  return (
    <section className="card">
      <h2>
        {chain} · {venue} · {asset}
      </h2>

      <div className="meta">
        Last update: {new Date(ts).toUTCString()}
      </div>

      <ul className="metrics">
        <li>
          <strong>Liquidity Depth:</strong>{" "}
          {metrics.depth.depth.toLocaleString()}
        </li>

        <li>
          <strong>Liquidity Elasticity:</strong>{" "}
          {metrics.elasticity.elasticity ?? "—"}
        </li>

        <li>
          <strong>Liquidity Fragmentation:</strong>{" "}
          {metrics.fragmentation.fragmentationIndex.toFixed(3)}
        </li>
      </ul>
    </section>
  );
}
