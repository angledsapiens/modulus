import { useEffect, useState } from "react";
import type { MetricSnapshot } from "./types/metrics";
import { FileMetricSource } from "./sources/FileMetricSource";
import Header from "./components/Header";
import MetricStateCard from "./components/MetricStateCard";
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

      <MetricStateCard
        title="Liquidity Depth"
        metric="depth"
        snapshots={snapshots}
      />

      <MetricStateCard
        title="Liquidity Elasticity"
        metric="elasticity"
        snapshots={snapshots}
      />

      <MetricStateCard
        title="Liquidity Fragmentation"
        metric="fragmentation"
        snapshots={snapshots}
      />

      <Footer />
    </div>
  );
}

export default App;
