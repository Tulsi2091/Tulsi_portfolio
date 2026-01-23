import { useEffect, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "Who is Tulsi?",
  "Summarize Tulsi’s background in 5 bullet points.",
  "Tell me about Tulsi’s experience at Alkermes.",
  "What are Tulsi’s strongest projects?",
  "What skills/tools does Tulsi use?",
  "How can I contact Tulsi?",
];

function looksTruncated(text: string) {
  const t = text.trim();
  if (!t) return false;

  // If it ends without punctuation, it's often cut off
  const endsCleanly = /[.!?)\]"']$/.test(t);

  // If user asked for 5 bullets but we got < 5 numbered lines
  const numbered = (t.match(/^\s*\d+\.\s+/gm) || []).length;

  return !endsCleanly || (t.includes("1.") && numbered > 0 && numbered < 5);
}

function parseRetrySeconds(errMsg: string): number | null {
  // Matches: "Please retry in 5.839482461s"
  const match = errMsg.match(/retry in ([\d.]+)s/i);
  if (!match) return null;
  return Math.ceil(Number(match[1]));
}



async function callGeminiDirect(message: string, system: string, history: Msg[]) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
  if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY");

  // Model name (Gemini REST v1)
  const model = "models/gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`;

  // Convert our history to Gemini "contents"
  // Gemini roles: "user" and "model"
  const contents: any[] = [];

  // Put system instruction first (as user content)
  if (system?.trim()) {
    contents.push({
      role: "user",
      parts: [{ text: `SYSTEM INSTRUCTION:\n${system.trim()}` }],
    });
  }

  // Last few turns for context (avoid huge requests)
  const recent = history.slice(-8);
  for (const h of recent) {
    contents.push({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    });
  }

  // Current message
contents.push({
  role: "user",
  parts: [{
    text: `QUESTION:
${message}

OUTPUT FORMAT:
Plain text only.
Numbered list if applicable.
No markdown or special symbols.`
  }],
});


  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 900,
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(
      `Gemini error: ${resp.status}\n${JSON.stringify(data, null, 2)}`
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") || "";

  return text || "No response text returned.";
}

export default function TulsiChat() {
  const [system, setSystem] = useState("");
  const [history, setHistory] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m Tulsi — Tulsi’s portfolio assistant. Ask me about education, experience, projects, or skills.",
    },
  ]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/tulsi_system.txt")
      .then((r) => r.text())
      .then(setSystem)
      .catch(() => setSystem(""));
  }, []);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    const nextHistory: Msg[] = [...history, { role: "user", content: q } as const];
    setHistory(nextHistory);

    setMsg("");
    setLoading(true);

    try {
      const answer = await callGeminiDirect(q, system, nextHistory);
      let finalAnswer = answer;

        // Auto-continue once if it looks truncated
        if (looksTruncated(finalAnswer)) {
        const continuePrompt =
            "Continue EXACTLY from where you stopped. Do not repeat earlier text. Keep the same format.";
        const continued = await callGeminiDirect(continuePrompt, system, [
            ...nextHistory,
            { role: "assistant", content: finalAnswer } as const,
        ]);

        // append
        finalAnswer = `${finalAnswer}\n${continued}`.trim();
        }

      setHistory((h) => [...h, { role: "assistant", content: finalAnswer } as const]);
    } catch (e: any) {

  const raw = String(e?.message || e);

  const retrySeconds = parseRetrySeconds(raw);

  const friendlyMessage = retrySeconds
    ? `⚠️ Tulsi is temporarily rate-limited.\nPlease try again in ${retrySeconds} second${retrySeconds > 1 ? "s" : ""}.`
    : "⚠️ Tulsi is unavailable right now. Please try again in a moment.";

    setHistory((h) => [
        ...h,
        { role: "assistant", content: friendlyMessage } as const,
    ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-3xl border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chat with Tulsi</h2>
        <span className="text-xs text-gray-500">{loading ? "Thinking…" : "Ready"}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickPrompts.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-4 h-95 overflow-y-auto rounded-2xl border p-4">
        {history.map((m, i) => (
          <div key={i} className="mb-4">
            <div className="text-xs text-gray-500">{m.role === "user" ? "You" : "Tulsi"}</div>
            <div className="whitespace-pre-wrap text-sm">{m.content}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <textarea
            className="w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Ask Tulsi something… (Enter to send, Shift+Enter for a new line)"
            value={msg}
            rows={3}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(msg);
                }
            }}
            disabled={loading}
            />

        <button
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          onClick={() => send(msg)}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </section>
  );
}
