import { BriefcaseIcon } from "@heroicons/react/24/solid";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Exp = {
  company: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
  tech: string[];
  logoSrc?: string;
  logoAlt?: string;
};

const experience: Exp[] = [
  {
    role: "Machine Learning Engineer",
    company: "Alkermes Inc.",
    location: "Waltham, MA",
    dates: "Jul 2025 – Present",
    logoSrc: "/experience/Alkermes.png", // <-- add your file
    logoAlt: "Alkermes",
    bullets: [
      "Developing EEG-based treatment prediction machine learning models (Elastic Net, Random Forest, LightGBM) on 5,000+ patient recordings, applying PCA-based dimensionality reduction to cut feature space by 70% while retaining 95% of variance, improving model training speed by 3x.",
      "Engineered end-to-end model evaluation infrastructure with cross-validation, SHAP-based explainability reports, and data visualization dashboards, collaborating with a team of 4 data scientists to ensure FDA-compliant, reproducible outputs via MLflow.",
      ],
    tech: [
      "Python",
      "Machine Learning",
      "Time Series",
      "PCA",
      "Data Visualization",
      "Data Preprocessing",
      "MLflow",
    ],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "Alkermes Inc.",
    location: "Waltham, MA",
    dates: "Jul 2025 – Present",
    logoSrc: "/experience/Alkermes.png", // <-- add your file
    logoAlt: "Alkermes",
    bullets: [
      "Spearheaded development of a clinical report automation app using Snowflake AI Cortex, integrating Large Language Models (GPT-5, Llama-3.1-70B, Mistral Large) to auto-generate 10+ structured report sections, cutting drafting time by 80% for a team of 8 medical writers.",
      "Architected a secure RAG pipeline using Snowflake Vector Store and AWS S3, embedding 1,000+ proprietary clinical documents to enable sub-second semantic retrieval with >90% summary accuracy, serving as a core MLOps component of the production system.",
      "Designed an LLM-powered chat assistant allowing medical writers to refine report content via natural language prompts, reducing revision cycles by 65% and receiving a 4.7/5 usability score across 3 departments.",
      "Containerized the AI application using Docker and deployed on Snowpark Container Services with auto-scaling, supporting 15 concurrent users.",
    ],
    tech: [
      "Python",
      "Streamlit",
      "Snowflake Cortex",
      "Snowflake Vector Store",
      "RAG",
      "AWS S3",
      "Docker",
      "Snowpark Container Services",
    ],
  },
  {
    role: "Research and Development Intern",
    company: "Sahajanand Technologies Pvt. Ltd.",
    location: "Surat, India",
    dates: "Jan 2023 – May 2023",
    logoSrc: "/experience/STPL.jpeg",
    logoAlt: "Sahajanand Technologies",
    bullets: [
      "Developed a Computer Vision pipeline for automated diamond inclusion detection using OpenCV and Scikit-image, processing 500+ gemstone images with contour-based and segmentation techniques, improving detection accuracy to 93% versus an 80% manual baseline.",
      "Applied preprocessing techniques (histogram equalization, noise reduction) to handle variable image quality, and designed image-processing pipelines to extract facet and table zones, reducing region segmentation errors and cutting per-stone inspection time from 8 to under 2 minutes.",
      "Integrated AWS DynamoDB as the metadata store for grading results, enabling structured querying across 1k+ graded diamonds and reducing data retrieval latency.",
    ],
    tech: ["Python", "Flask", "DynamoDB", "OpenCV", "scikit-image", "Computer Vision", "Image Processing", "Pipelines"],
  },
  {
    role: "Undergraduate Research Intern",
    company: "Nirma University",
    location: "Ahmedabad, India",
    dates: "Jun 2022 – Dec 2022",
    logoSrc: "/experience/Nirma.jpg",
    logoAlt: "Nirma University",
    bullets: [
      "Orchestrated a large-scale NLP data pipeline using SNScrape and Google Translate API to collect 600K+ multilingual tweets from 523 politicians across 12 languages for a university-funded digital humanities project.",
      "Co-authored a literature survey paper (manuscript) reviewing 40+ research papers on gendered language in politics.",
      "Fine-tuned Large Language Models (BERT, RoBERTa) and deep learning models (CNN, LSTM, GRU) for sentiment analysis and gendered language classification, with RoBERTa achieving 86% accuracy, a 14 point gain over the CNN baseline.",
      "Delivered interactive Power BI dashboards visualizing NLP-derived gendered language patterns, contributing to research that won 2nd Prize at Digital Humanities in Oxford Week, judged by Oxford University and Alan Turing Institute researchers.",
    ],
    tech: ["PowerBI", "Python", "Natural Language Preocessing", "SNScrape", "Google Translate API", "LLMs", "Deep Learning", "Neural Networks"],
  },
  {
    role: "Software Development Intern",
    company: "Avioryn",
    location: "Surat, India",
    dates: "Jun 2022 – Aug 2022",
    logoSrc: "/experience/Avioryn.jpeg",
    logoAlt: "Avioryn",
    bullets: [
      "Co-developed core backend modules for 'CleanZone', a laundry logistics platform, using Node.js and MongoDB, enabling real-time order tracking and reducing lost-order support queries across partner operations.",
      "Implemented OTP-based authentication via the 2Factor API, QR code generation for product handoff, and a password recovery module in JavaScript, securing transactions and streamlining re-engagement for 30+ partner accounts.",
      "Collaborated with 2 UX designers to build data-driven dashboards, optimizing usability for multiple user personas.",
    ],
    tech: ["Node.js", "MongoDB", "JavaScript", "2Factor API", "Backend", "UI/UX", "APIs"],
  },
];

function Chip({ children }: { children: string }) {
  return (
    <span
      className="chip rounded-full px-3 py-1 text-xs"
      style={{
        border: "1px solid var(--cardBorder)",
        background: "rgba(255,255,255,.55)",
        color: "var(--ink)",
      }}
    >
      {children}
    </span>
  );
}

function TimelineItem({ exp }: { exp: Exp }) {
  return (
    <div className="relative pl-10">
      {/* dot */}
      <div
        className="absolute left-0 top-2 h-3 w-3 rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          boxShadow: "0 12px 26px rgba(176,137,104,.25)",
        }}
      />

      {/* line */}
      <div
        className="absolute left-[5px] top-7 h-[calc(100%+24px)] w-px"
        style={{
          background: "linear-gradient(180deg, rgba(20,20,20,.16), rgba(20,20,20,.02))",
        }}
      />

      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          {/* Company row with logo */}
          <div className="mt-1 flex items-center gap-3 leading-none">
            {exp.logoSrc ? (
              <div
                className="flex items-center rounded-lg px-2 py-1"
                style={{
                  background: "rgba(255,255,255,.35)",
                  border: "1px solid rgba(20,20,20,.06)",
                }}
              >
                <img
                  src={exp.logoSrc}
                  alt={exp.logoAlt || exp.company}
                  className="h-6 w-auto object-contain opacity-100"
                  style={{ filter: "none" }}
                />
              </div>
            ) : null}

            <h3 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
              {exp.company}
            </h3>
          </div>

          <p className="mt-0.5 text-sm font-semibold" style={{ color: "var(--muted)" }}>
            {exp.role}
          </p>

          <p className="mt-0.5 text-sm" style={{ color: "var(--muted)" }}>
            {exp.location}
          </p>
        </div>

        {/* right */}
        <div className="text-sm md:text-right" style={{ color: "var(--muted)" }}>
          <div className="font-medium" style={{ color: "var(--ink)" }}>
            {exp.dates}
          </div>
        </div>
      </div>

      {/* bullets */}
      <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
        {exp.bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>

      {/* chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {exp.tech.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>
  );
}

const listAnim: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ExperiencePage() {
  return (
    <AnimatedPage className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold tracking-tight">
          <BriefcaseIcon className="h-8 w-8 drop-shadow-sm" style={{ color: "var(--accent)" }} />
          Experience
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          Experience spanning applied research, machine learning, and software engineering.
        </p>
      </div>

      {/* Timeline */}
      <section className="mx-auto mt-12 max-w-4xl">
        <div
          className="mb-10 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.35,
          }}
        />

        <motion.div className="space-y-14" variants={listAnim} initial="hidden" animate="show">
          {experience.map((exp) => (
            <motion.div key={`${exp.company}-${exp.role}`} variants={itemAnim}>
              <TimelineItem exp={exp} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </AnimatedPage>
  );
}
