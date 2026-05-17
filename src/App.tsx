import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getVersion } from "@tauri-apps/api/app";
import "./App.css";

export default function App() {
  const [version, setVersion] = useState("");
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  async function check() {
    setChecking(true);
    setStatus("checking…");
    try {
      const r = await invoke<string>("check_update");
      setStatus(r);
    } catch (e) {
      setStatus(`error: ${e}`);
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="container">
      <h1>Vergo</h1>
      <div className="version">v{version}</div>
      <button onClick={check} disabled={checking}>
        {checking ? "Checking…" : "Check for Updates"}
      </button>
      <div className="status">{status}</div>
    </main>
  );
}
