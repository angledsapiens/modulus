import type { MetricSnapshot } from "../types/metrics";

type Props = {
  snapshot: MetricSnapshot;
};

export default function CurrentState({ snapshot }: Props) {
  const m = snapshot.metrics;

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        marginBottom: "40px"
      }}
    >
      <div>
        <div style={{ opacity: 0.6 }}>Liquidity Depth</div>
        <div>{m.liquidity_depth}</div>
      </div>

      <div>
        <div style={{ opacity: 0.6 }}>Liquidity Elasticity</div>
        <div>
          {Number.isNaN(m.liquidity_elasticity)
            ? "NaN"
            : m.liquidity_elasticity}
        </div>
      </div>

      <div>
        <div style={{ opacity: 0.6 }}>
          Liquidity Fragmentation
        </div>
        <div>{m.liquidity_fragmentation}</div>
      </div>
    </section>
  );
}
