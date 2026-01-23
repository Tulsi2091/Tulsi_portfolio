import TulsiChat from "../components/TulsiChat_groq";


export default function Chat() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Ask <span className="accent">Tulsi</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          An AI assistant that answers questions about my education, experience, projects, skills and more.
        </p>
      </div>

      <div className="glass p-6">
        <TulsiChat />
        <p className="mt-6 text-center text-xs text-gray-500">
  Powered by Groq + LLaMA • Designed & built by Tulsi Patel
</p>
      </div>

    {/* <main className="min-h-[calc(100vh-64px)] bg-gray-50">
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ask Tulsi</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
            This AI assistant can answer questions about my education, experience,
            projects, and skills. 
        </p>
        </div>


      <TulsiChat />
      <p className="mt-6 text-center text-xs text-gray-500">
  Powered by Groq + LLaMA • Designed & built by Tulsi Patel
</p>

    </div> */}
    </main>
  );
}
