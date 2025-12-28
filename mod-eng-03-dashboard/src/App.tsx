import { useEffect, useState } from "react";
import type { MetricSnapshot } from "./types/metrics";
import { FileMetricSource } from "./sources/FileMetricSource";
import Header from "./components/Header";
import CurrentState from "./components/CurrentState";
import MetricChart from "./components/MetricChart";
import Footer from "./components/Footer";
import "./styles/app.css";

const source = new FileMetricSource("/metrics.json");

function App() {
  const [snapshots, setSnapshots] = useState<MetricSnapshot[]>([]);

  useEffect(() => {
    source.subscribe(setSnapshots);
  }, []);

  if (snapshots.length === 0) {
    return <div className="loading">Waiting for data…</div>;
  }

  const latest = snapshots[snapshots.length - 1];

  return (
    <div className="app">
      <Header snapshot={latest} />
      <CurrentState snapshot={latest} />
      <MetricChart
        title="Liquidity Depth"
        data={snapshots}
        metricKey="liquidity_depth"
      />
      <MetricChart
        title="Liquidity Elasticity"
        data={snapshots}
        metricKey="liquidity_elasticity"
      />
      <MetricChart
        title="Liquidity Fragmentation"
        data={snapshots}
        metricKey="liquidity_fragmentation"
      />
      <Footer />
    </div>
  );
}

export default App;
