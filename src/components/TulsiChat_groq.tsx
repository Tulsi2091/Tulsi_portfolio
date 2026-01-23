import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "Summarize Tulsi’s background.",
  "What are Tulsi’s strongest projects?",
  "Tell me about Tulsi’s education and experience.",
];

function looksTruncated(text: string) {
  const t = text.trim();
  if (!t) return false;
  const endsCleanly = /[.!?)\]"']$/.test(t);
  const numbered = (t.match(/^\s*\d+\.\s+/gm) || []).length;
  return !endsCleanly || (t.includes("1.") && numbered > 0 && numbered < 5);
}

function parseRetrySeconds(errMsg: string): number | null {
  const match = errMsg.match(/try again in ([\d.]+)s/i);
  if (!match) return null;
  return Math.ceil(Number(match[1]));
}

async function callGroqDirect(message: string, system: string, history: Msg[]) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string;
  if (!apiKey) throw new Error("Missing VITE_GROQ_API_KEY");

  const model = "llama-3.3-70b-versatile";
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const messages = [
    ...(system?.trim() ? [{ role: "system", content: system.trim() }] : []),
    ...history.slice(-10).map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: message },
  ];

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.35,
      max_tokens: 900,
    }),
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(`Groq error: ${resp.status}\n${JSON.stringify(data, null, 2)}`);
  }

  const text = data?.choices?.[0]?.message?.content?.trim();
  return text || "No response text returned.";
}

export default function TulsiChat() {
  const [system, setSystem] = useState("");
  const [history, setHistory] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m Tulsi’s portfolio assistant. Ask me about education, experience, projects, or skills.",
    },
  ]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/tulsi_system.txt")
      .then((r) => r.text())
      .then(setSystem)
      .catch(() => setSystem(""));
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history, loading]);

  async function send(text: string) {
    const q = (text || "").trim();
    if (!q || loading) return;

    const nextHistory: Msg[] = [...history, { role: "user", content: q } as const];
    setHistory(nextHistory);
    setMsg("");
    setLoading(true);

    try {
      const wrapped = `QUESTION:
${q}

STRICT OUTPUT REQUIREMENTS:
- Plain text only (no markdown).
- If the user asked for a number of bullet points, return EXACTLY that many numbered lines.
- Do not invent facts. If unsure, say you don’t have that detail available.
- Keep the answer recruiter-friendly and structured.
`;

      const answer = await callGroqDirect(wrapped, system, nextHistory);
      let finalAnswer = answer;

      if (looksTruncated(finalAnswer)) {
        const continuePrompt =
          "Continue EXACTLY from where you stopped. Do not repeat earlier text. Keep the same format.";
        const continued = await callGroqDirect(continuePrompt, system, [
          ...nextHistory,
          { role: "assistant", content: finalAnswer } as const,
        ]);
        finalAnswer = `${finalAnswer}\n${continued}`.trim();
      }

      setHistory((h) => [...h, { role: "assistant", content: finalAnswer } as const]);
    } catch (e: any) {
      const raw = String(e?.message || e);
      const retrySeconds = parseRetrySeconds(raw);

      const friendlyMessage = retrySeconds
        ? `Rate limit exceeded. Please try again in ${retrySeconds} second${retrySeconds > 1 ? "s" : ""}.`
        : "Tulsi is unavailable right now. Please try again in a moment.";

      setHistory((h) => [...h, { role: "assistant", content: friendlyMessage } as const]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Prompt chips */}
      <div className="mt-2 flex flex-wrap justify-center gap-3 bg-transparent">
  {quickPrompts.map((p) => (
    <button
      key={p}
      onClick={() => send(p)}
      disabled={loading}
      className="rounded-full px-4 py-1.5 text-sm font-medium transition disabled:opacity-50"
      style={{
        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
        color: "white",
        boxShadow: "0 8px 20px rgba(176,137,104,.28)",
      }}
    >
      {p}
    </button>
  ))}
</div>

      {/* Chat log */}
      <div
        ref={scrollRef}
        className="mt-4 h-[360px] overflow-y-auto rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,.45)",
          border: "1px solid var(--cardBorder)",
        }}
      >
        <div className="space-y-3">
          {history.map((m, i) => (
            <div
              key={i}
              className={["flex", m.role === "user" ? "justify-end" : "justify-start"].join(" ")}
            >
              <div
                className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={
                  m.role === "user"
                    ? {
                        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                        color: "white",
                        boxShadow: "0 10px 24px rgba(176,137,104,.22)",
                      }
                    : {
                        background: "rgba(255,255,255,.72)",
                        border: "1px solid var(--cardBorder)",
                        color: "var(--ink)",
                      }
                }
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="rounded-2xl px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,.72)",
                  border: "1px solid var(--cardBorder)",
                  color: "var(--muted)",
                }}
              >
                Tulsi is typing…
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 flex items-end gap-2">
        <textarea
          className="w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none"
          placeholder="Ask Tulsi something… (Enter to send, Shift+Enter for a new line)"
          rows={2}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(msg);
            }
          }}
          disabled={loading}
          style={{
            background: "rgba(255,255,255,.55)",
            border: "1px solid var(--cardBorder)",
            color: "var(--ink)",
          }}
        />

        <button
          onClick={() => send(msg)}
          disabled={loading}
          className="h-[56px] px-6 text-sm font-medium disabled:opacity-50"
          style={{
            borderRadius: 18,
          }}
        >
          <span className="btn-premium px-5 py-3">Send</span>
        </button>
      </div>

      <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
        Tip: Ask “What projects show backend skills?” or “What skills or tools Tulsi knows?”
      </div>
    </div>
  );
}
