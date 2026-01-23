
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      
      <section className="grid items-center gap-8 md:grid-cols-[1.6fr_1fr]">
        
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Hi, I’m Tulsi Patel 
          </h1>

          <p className="mt-4 max-w-none text-base" style={{ color: "var(--muted)" }}>
            I am a Master’s graduate in Computer Science from Arizona State University (GPA 4.0).
            I enjoy building scalable software systems and applied AI/ML solutions, especially end-to-end products
            that combine backend engineering with intelligent data-driven features.
          </p>

          
          <div className="mt-8">
            <a
  href="/chat"
  className="btn-premium inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium
             transition-all duration-300 hover:-translate-y-0.5"
  style={{
    boxShadow: "0 8px 20px rgba(176,137,104,.35)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow =
      "0 16px 40px rgba(176,137,104,.55)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow =
      "0 8px 20px rgba(176,137,104,.35)";
  }}
>
  Ask My AI Assistant
</a>

          </div>
          
        </div>

        <div className="relative flex justify-center md:justify-end">
  
  <div
    className="absolute -right-6 top-6 hidden h-66 w-66 rounded-full md:block"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, rgba(212,163,115,.45), transparent 60%)",
      filter: "blur(6px)",
      opacity: 0.9,
    }}
  />

  <div className="md:translate-x-6 transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.5deg]">
    <div
      className="h-62 w-62 rounded-full transition-shadow duration-300 hover:shadow-2xl"
      style={{
        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
        padding: "4px",
         boxShadow: "0 8px 20px rgba(176,137,104,.35)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow =
      "0 16px 40px rgba(176,137,104,.55)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow =
      "0 8px 20px rgba(176,137,104,.35)";
  }}
    >
      <img
        src="/Profile.jpeg"
        alt="Tulsi Patel"
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  </div>
</div>
      </section>

      <div className="my-10 flex items-center justify-center">
  <div
    className="h-px w-full max-w-3xl"
    style={{
      background:
        "linear-gradient(90deg, transparent, rgba(20,20,20,.12), transparent)",
    }}
  />
</div>

      {/* WHAT I DO */}
      <section className="mt-2">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            What I <span className="accent">do</span>
          </h2>
          {/* <p
            className="mx-auto mt-2 max-w-2xl text-sm"
            style={{ color: "var(--muted)" }}
          >
            I build end-to-end products that combine solid software engineering with applied AI/ML.
          </p> */}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="glass p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-sm font-semibold relative inline-block">
            Software Engineering
            <span
                className="absolute left-0 -bottom-1 h-px w-full"
                style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }}
            />
            </div>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Backend + full-stack development: APIs, data models, clean architecture, and scalable systems.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["JavaScript", "Django", "React", "Node.js", "SQL", "CSS"].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    border: "1px solid var(--cardBorder)",
                    background: "rgba(255,255,255,.55)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-sm font-semibold relative inline-block">
            Artificial Intelligence
            <span
                className="absolute left-0 -bottom-1 h-px w-full"
                style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }}
            />
            </div>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              RAG + LLM apps, embeddings, evaluation, and practical AI features that behave reliably in real products.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["RAG", "LLMs", "Embeddings", "LangChain","Prompting"].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    border: "1px solid var(--cardBorder)",
                    background: "rgba(255,255,255,.55)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-sm font-semibold relative inline-block">
            Machine Learning
            <span
                className="absolute left-0 -bottom-1 h-px w-full"
                style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }}
            />
            </div>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Modeling, analysis, and evaluation to extract patterns, make predictions, and support decisions at scale.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Python", "Modeling", "Power BI","Prediction", "Metrics"].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    border: "1px solid var(--cardBorder)",
                    background: "rgba(255,255,255,.55)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
