import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { MetricSnapshot } from "../types/metrics";

type MetricKey =
  | "depth"
  | "elasticity"
  | "fragmentation";

type Props = {
  title: string;
  data: MetricSnapshot[];
  metricKey: MetricKey;
};

export default function MetricChart({ title, data, metricKey }: Props) {
  const chartData = data.map((s) => {
    let value: number | null = null;

    const m = s.metrics;

    switch (metricKey) {
      case "depth":
        value = m.depth?.depth ?? null;
        break;

      case "elasticity":
        value = m.elasticity?.elasticity ?? null;
        break;

      case "fragmentation":
        value = m.fragmentation?.fragmentationIndex ?? null;
        break;
    }

    return {
      ts: s.ts,
      value
    };
  });

  return (
    <section className="card">
      <h3>{title}</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="ts"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            }
          />
          <YAxis />
          <Tooltip labelFormatter={(t) => new Date(t).toUTCString()} />
          <Line
            type="linear"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            isAnimationActive={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
