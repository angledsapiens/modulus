import type { MetricSnapshot } from "../types/metrics";

type Props = {
  snapshot: MetricSnapshot & {
    annotation?: {
      summary: string;
    };
  };
};

export default function Header({ snapshot }: Props) {
  const time = new Date(snapshot.ts).toUTCString();

  return (
    <header style={{ marginBottom: "32px" }}>
      <div style={{ fontSize: "18px", marginBottom: "8px" }}>
        MODULUS — On-chain System Dynamics
      </div>

      <div style={{ opacity: 0.8 }}>
        {snapshot.chain} · {snapshot.venue} · {snapshot.asset}
      </div>

      <div style={{ fontSize: "12px", opacity: 0.6 }}>
        Last update: {time}
      </div>

      {snapshot.annotation && (
        <div style={{ marginTop: "12px", fontSize: "16px", color: "#fff"}}>
          {snapshot.annotation.summary}
        </div>
      )}
    </header>
  );
}

