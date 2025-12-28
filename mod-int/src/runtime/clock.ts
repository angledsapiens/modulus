import { RuntimeConfig } from "./config";
import { fetchSnapshot } from "./adapterFactory";
import { runMetrics } from "./metrics";
import { emit } from "../outputs/stdout";

export function startClock() {
  console.log(
    `[MOD-INT] clock started | chain=${RuntimeConfig.chain} | interval=${RuntimeConfig.pollIntervalMs}ms`
  );

  setInterval(() => {
    tick();
  }, RuntimeConfig.pollIntervalMs);
}

async function tick() {
  console.log(`[MOD-INT] tick @ ${new Date().toISOString()}`);

  try {
    const snapshot = await fetchSnapshot(RuntimeConfig.chain);

    const metrics = runMetrics(snapshot);

    emit("metrics", {
      chain: snapshot.chain,
      venue: snapshot.venue,
      asset: snapshot.asset,
      ts: snapshot.ts,
      metrics
    });

    console.log("[MOD-INT] metrics emitted successfully");
  } catch (err) {
    console.error("[MOD-INT] runtime error:", err);
  }
}
