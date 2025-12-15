"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");

  async function compare() {
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const text = await res.text();
      console.log("API response:", text);

      const data: { modelA: string; modelB: string } = JSON.parse(text);

      setA(data.modelA);
      setB(data.modelB);
    } catch (err) {
      console.error(err);
      alert("Error fetching model responses");
    }
  }

  return (
    <main>
      <h1>🤖 AI Model Battle</h1>
      <p>Compare AI models side by side</p>

      <textarea
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br />
      <button onClick={compare}>Compare Models</button>

      <div className="grid">
        <div>
          <h3>Model A</h3>
          <p>{a}</p>
        </div>

        <div>
          <h3>Model B</h3>
          <p>{b}</p>
        </div>
      </div>
    </main>
  );
}
