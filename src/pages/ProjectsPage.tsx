// src/pages/ProjectsPage.tsx
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
  FolderKanban,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

type Project = {
  title: string;
  summary: string;
  image?: string;
  tech: string[];
  impact: string[];
  highlights: string[];
  links?: { github?: string; live?: string };
};

const projects: Project[] = [
  {
  title: "Portfolio AI Assistant",
  summary:
    "An on-site AI assistant that answers questions about my background, skills, and projects directly from my portfolio.",
  image: "/projects/1.png",
  tech: ["React", "TypeScript", "LLMs", "Prompt Engineering", "UI/UX"],
  impact: [
    "Improved recruiter experience by providing instant, contextual answers from the portfolio.",
    "Reduced the need for manual navigation across sections by enabling conversational exploration.",
  ],
  highlights: [
    "Built an embedded AI chat assistant integrated directly into the portfolio website.",
    "Implemented conversation handling to answer questions about skills, projects, and experience accurately.",
    "Added safeguards to prevent hallucinations and irrelevant responses outside the portfolio scope.",
    "Focused on clean UI/UX with quick prompts, multi-line input, and graceful error handling.",
  ],
  links: { github: "", live: "/chat" },
},
  {
  title: "AI Clinical Assistant",
  summary:
    "A retrieval-augmented AI assistant for accurate question answering over large-scale clinical datasets.",
  image: "/projects/2.png",
  tech: ["Python", "RAG", "Embeddings", "MongoDB Atlas", "vLLM", "Mistral"],
  impact: [
    "Enabled reliable clinical Q&A over 60K+ records with low latency.",
    "Achieved ~91.5% answer accuracy through optimized retrieval and prompting.",
  ],
  highlights: [
    "Indexed over 60,000 clinical records from the MedQA dataset using semantic embeddings for efficient retrieval.",
    "Deployed more than 1.2 million embeddings in MongoDB Atlas to significantly reduce response time.",
    "Built a Retrieval-Augmented Generation pipeline combining vector search with large language models for grounded answers.",
    "Integrated Mistral-7B-Instruct via vLLM to generate consistent, HIPAA-compliant responses.",
    "Designed prompt templates and retrieval strategies to minimize hallucinations and improve factual accuracy.",
  ],
  links: { github: "", live: "" },
},
  {
  title: "E-Commerce Product Chatbot",
  summary:
    "A retrieval-augmented chatbot that answers product-related questions across a large e-commerce catalog.",
  image: "/projects/3.png",
  tech: ["Python", "RAG", "FAISS", "Sentence-BERT", "LangChain", "GPT-4"],
  impact: [
    "Enabled natural language search and Q&A over 10,000+ product listings.",
    "Improved relevance and answer quality using semantic retrieval instead of keyword matching.",
  ],
  highlights: [
    "Built a Retrieval-Augmented Generation (RAG) chatbot to answer customer queries across an e-commerce product catalog.",
    "Generated semantic embeddings for 10,000+ SKUs using Sentence-BERT (SBERT) to capture product meaning and context.",
    "Indexed embeddings in FAISS to enable fast and scalable vector similarity search.",
    "Used LangChain to orchestrate retrieval, prompt construction, and response generation workflows.",
    "Integrated GPT-4 for natural language responses grounded in retrieved product data.",
  ],
  links: { github: "", live: "" },
},
  {
  title: "Bon Appetit – Restaurant Website",
  summary:
    "A full-stack restaurant platform supporting online reservations, menu management, and admin workflows.",
  image: "/projects/4.png",
  tech: ["React", "Node.js", "MongoDB", "JWT", "Nodemailer", "Bootstrap"],
  impact: [
    "Supported 100+ menu items and processed 200+ monthly reservations.",
    "Streamlined reservation and admin management through a unified platform.",
  ],
  highlights: [
    "Built a full-stack restaurant website using React, Node.js, and MongoDB.",
    "Implemented an online reservation system handling 200+ monthly bookings.",
    "Designed a responsive Bootstrap-based UI with interactive components.",
    "Secured the admin panel using JWT-based authentication and role-based access.",
    "Automated reservation confirmation and notifications using Nodemailer.",
  ],
  links: { github: "", live: "" },
},
  {
  title: "E-Commerce Analytics Dashboard",
  summary:
    "A platform for tracking customer behavior and sales trends using APIs and interactive dashboards.",
  image: "/projects/5.png",
  tech: ["Django", "PostgreSQL", "Plotly", "REST APIs", "Stripe"],
  impact: [
    "Visualized insights from 1,000+ transactions to support data-driven decisions.",
    "Enabled structured analysis of sales performance and customer behavior.",
  ],
  highlights: [
    "Developed a full-stack analytics dashboard using Django and PostgreSQL to manage and analyze e-commerce data.",
    "Designed RESTful APIs to serve transaction, customer, and product data to the frontend.",
    "Built interactive visualizations using Plotly to track sales trends, customer behavior, and performance metrics.",
    "Integrated Stripe API to simulate real-time payment flows and generate realistic transaction data.",
    "Implemented admin-level controls to manage products and transactions securely.",
  ],
  links: { github: "", live: "" },
},
];

function clampIndex(i: number, n: number) {
  return ((i % n) + n) % n;
}

function Pill({ children }: { children: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs"
      style={{
        border: "1px solid rgba(20,20,20,.08)",
        background: "rgba(255,255,255,.45)",
        color: "var(--ink)",
        boxShadow: "0 8px 20px rgba(15,15,15,.03)",
      }}
    >
      {children}
    </span>
  );
}


const pageAnim: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const headerAnim: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const tilesWrapAnim: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const tileAnim: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const modalOverlayAnim: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalCardAnim: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 14,
    scale: 0.985,
    filter: "blur(10px)",
    transition: { duration: 0.22, ease: "easeIn" },
  },
};


function Modal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0"
            onClick={onClose}
            variants={modalOverlayAnim}
            style={{
  background: "color-mix(in srgb, var(--paper) 65%, transparent)",
  backdropFilter: "blur(6px)",
}}

          />

          <motion.div className="relative mx-auto mt-14 w-[min(960px,92vw)]">
            <motion.div
              variants={modalCardAnim}
              className="relative overflow-hidden rounded-[28px] p-7"
              style={{
                background: "rgba(255,255,255,.96)",
                border: "1px solid rgba(20,20,20,.10)",
                boxShadow: "0 35px 110px rgba(0,0,0,.22)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  border: "1px solid rgba(20,20,20,.12)",
                  background: "rgba(255,255,255,.7)",
                }}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
                <div>
                  <div className="overflow-hidden rounded-3xl">
                    <img
                      src={project.image || "/projects/project.png"}
                      alt={project.title}
                      className="h-76 w-full object-cover"
                      style={{ background: "rgba(0,0,0,.06)" }}
                    />
                  </div>

                  <h2
                    className="mt-5 text-2xl font-semibold"
                    style={{ color: "var(--ink)" }}
                  >
                    {project.title}
                  </h2>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {project.summary}
                  </p>

                  {(project.links?.github || project.links?.live) && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.links?.github ? (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                          style={{
                            background: "rgba(255,255,255,.70)",
                            border: "1px solid rgba(20,20,20,.12)",
                          }}
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      ) : null}

                      {project.links?.live ? (
                        <a
                          href={project.links.live}
                          target={
                            project.links.live.startsWith("/")
                              ? "_self"
                              : "_blank"
                          }
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--accent), var(--accent2))",
                            color: "white",
                            boxShadow: "0 14px 30px rgba(176,137,104,.22)",
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live / Demo
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="md:pl-2">
                  <div
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted)" }}
                  >
                    Tech Stack
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--muted)" }}
                    >
                      Impact
                    </div>
                    <ul
                      className="mt-2 space-y-2 text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.impact.map((x, i) => (
                        <li key={i}>• {x}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <div
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--muted)" }}
                    >
                      Highlights
                    </div>
                    <ul
                      className="mt-2 space-y-2 text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.highlights.map((x, i) => (
                        <li key={i}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs opacity-60">
                Press Esc or click outside to close.
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


function ProjectTileMinimal({
  p,
  isActive,
  onReadMore,
}: {
  p: Project;
  isActive: boolean;
  onReadMore: () => void;
}) {
  const sideBlur = isActive ? "blur(0px)" : "blur(1.2px)";
  const sideOpacity = isActive ? 1 : 0.78;

  return (
    <motion.div variants={tileAnim} initial={false} className="relative w-full">

      {isActive && (
        <div
          className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,0,0,.22), rgba(0,0,0,0))",
            filter: "blur(10px)",
            opacity: 0.34,
          }}
        />
      )}

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative w-full overflow-hidden rounded-[28px]"
        style={{
          height: 410,
          background: "rgba(255,255,255,.62)",
          border: isActive
            ? "1px solid rgba(176,137,104,.40)"
            : "1px solid rgba(20,20,20,.10)",
          boxShadow: isActive
            ? "0 34px 92px rgba(15,15,15,.18)"
            : "0 18px 55px rgba(15,15,15,.10)",
          transform: isActive
            ? "translateY(-10px) scale(1.02)"
            : "translateY(0px) scale(.99)",
          opacity: sideOpacity,
          filter: `${sideBlur} ${isActive ? "" : "saturate(.90) contrast(.99)"}`.trim(),
          transition:
            "transform 260ms ease, opacity 220ms ease, filter 220ms ease, box-shadow 220ms ease",
        }}
      >
        <div className="relative z-10">
          {p.links?.github ? (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "rgba(255,255,255,.75)",
                border: "1px solid rgba(20,20,20,.10)",
                boxShadow: "0 14px 28px rgba(0,0,0,.10)",
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${p.title} GitHub`}
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          ) : null}

          <div className="p-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={p.image || "/projects/project.png"}
                alt={p.title}
                className="h-30 w-full object-cover"
                style={{ background: "rgba(0,0,0,.06)" }}
              />
            </div>
          </div>

          <div className="flex h-[calc(100%-140px)] flex-col px-8 pb-7 text-center">
            <h3 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
              {p.title}
            </h3>

            <div
              className="mx-auto mt-2 mb-2 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent), transparent)",
                opacity: isActive ? 0.38 : 0.18,
              }}
            />

            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {p.summary}
            </p>

            <div className="mt-auto pt-5">
              <motion.button
                onClick={onReadMore}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="mx-auto inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium"
                style={{
                  background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                  color: "white",
                  boxShadow: "0 14px 30px rgba(176,137,104,.22)",
                }}
              >
                Read more →
              </motion.button>
            </div>
          </div>
        </div>

        {isActive && (
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              borderRadius: 28,
              boxShadow: "inset 0 0 0 1px rgba(176,137,104,.18)",
              background:
                "radial-gradient(760px 240px at 50% 0%, rgba(176,137,104,.12), transparent 60%)",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}


export default function ProjectsPage() {
  const total = projects.length;
  const [center, setCenter] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // responsive: show 1 card on small screens, 3 on md+
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsMd(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const visible = useMemo(() => {
    if (!isMd) return [center];
    const left = clampIndex(center - 1, total);
    const right = clampIndex(center + 1, total);
    return [left, center, right];
  }, [center, total, isMd]);

  const prev = () => setCenter((c) => clampIndex(c - 1, total));
  const next = () => setCenter((c) => clampIndex(c + 1, total));

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (openIdx !== null) {
        if (e.key === "Escape") setOpenIdx(null);
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);

  }, [openIdx]);

  return (
    <motion.main
      className="mx-auto max-w-6xl px-4 py-16"
      variants={pageAnim}
      initial="hidden"
      animate="show"
    >
      <motion.div className="text-center" variants={headerAnim}>
        <h1 className="inline-flex items-center justify-center gap-3 text-4xl font-bold tracking-tight">
          <FolderKanban className="h-8 w-8" style={{ color: "var(--accent)" }} />
          Projects
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          Projects highlighting my work in software engineering and applied AI/ML.
        </p>

        <div
          className="mx-auto mt-12 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.35,
          }}
        />
      </motion.div>

      <section className="relative mx-auto mt-12 max-w-6xl">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24"
          style={{
            background: "linear-gradient(90deg, var(--paper), rgba(0,0,0,0))",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24"
          style={{
            background: "linear-gradient(270deg, var(--paper), rgba(0,0,0,0))",
          }}
        />

        {/* arrows */}
        <button
          onClick={prev}
          className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full p-3"
          style={{
            background: "rgba(255,255,255,.75)",
            border: "1px solid rgba(20,20,20,.12)",
            boxShadow: "0 16px 40px rgba(0,0,0,.10)",
          }}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={next}
          className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full p-3"
          style={{
            background: "rgba(255,255,255,.75)",
            border: "1px solid rgba(20,20,20,.12)",
            boxShadow: "0 16px 40px rgba(0,0,0,.10)",
          }}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="px-10 md:px-16">
          <motion.div
            className={`grid gap-5 ${isMd ? "md:grid-cols-3" : "grid-cols-1"}`}
            variants={tilesWrapAnim}
            initial="hidden"
            animate="show"
            key={`${isMd}-${center}`} 
          >
            {visible.map((idx, pos) => {
              const p = projects[idx];
              const isActive = isMd ? pos === 1 : true;
              return (
                <ProjectTileMinimal
                  key={`${idx}-${p.title}`}
                  p={p}
                  isActive={isActive}
                  onReadMore={() => setOpenIdx(idx)}
                />
              );
            })}
          </motion.div>
        </div>

        {/* dots */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {projects.map((_, i) => {
            const active = i === center;
            return (
              <button
                key={i}
                onClick={() => setCenter(i)}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: active ? 26 : 10,
                  background: active
                    ? "linear-gradient(90deg, var(--accent), var(--accent2))"
                    : "rgba(20,20,20,.16)",
                  boxShadow: active ? "0 10px 24px rgba(176,137,104,.20)" : "none",
                }}
                aria-label={`Go to project ${i + 1}`}
              />
            );
          })}
        </div>
      </section>

      <Modal
        open={openIdx !== null}
        project={openIdx !== null ? projects[openIdx] : null}
        onClose={() => setOpenIdx(null)}
      />
    </motion.main>
  );
}
