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
    role: "Machine Learning Engineer Intern",
    company: "Alkermes Inc.",
    location: "Waltham, MA",
    dates: "Jul 2025 – Present",
    logoSrc: "/experience/Alkermes.png", // <-- add your file
    logoAlt: "Alkermes",
    bullets: [
      "Spearheading development of a clinical report automation Streamlit app using Snowflake AI Cortex, featuring an AI chat assistant that lets medical writers refine section content via prompts, reducing manual drafting effort by 80%.",
      "Designed secure RAG workflows with Snowflake Vector Store, leveraging AWS S3 for intermediate data storage and model prompt testing experiments, achieving >90% summary accuracy.",
      "Integrated LLMs (OpenAI GPT-5, Mistral Large 2, Llama 3.1–70B) to summarize key tables/figures across 10+ sections, and containerized the app using Docker for secure deployment on Snowpark Container Services.",
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
      "Created a Flask web app for graders to upload diamond images and get automated inclusion detection results, using DynamoDB to store grading metadata for fast retrieval.",
      "Prototyped defect detection systems using contour-based and segmentation techniques in Python, improving inclusion identification in diamond images to 93% accuracy.",
      "Customized image-processing pipelines with OpenCV and scikit-image to extract facet and table zones, improving region segmentation and reducing manual inspection overhead.",
      "Evaluated computer vision techniques (Thresholding, Contours, SIFT, Watershed) across 5k+ diamond images.",
    ],
    tech: ["Python", "Flask", "DynamoDB", "OpenCV", "scikit-image", "Computer Vision"],
  },
  {
    role: "Undergraduate Research Intern",
    company: "Nirma University",
    location: "Ahmedabad, India",
    dates: "Jun 2022 – Dec 2022",
    logoSrc: "/experience/Nirma.jpg",
    logoAlt: "Nirma University",
    bullets: [
      "Delivered interactive PowerBI dashboards showcasing gender-based language patterns for a university-funded digital humanities research project.",
      "Orchestrated a tweet analysis pipeline collecting 600k+ multilingual tweets from 523 politicians using SNScrape, profile-based gender tagging, and Google Translate API.",
      "Configured and trained deep learning models (CNN, ANN, LSTM, GRU, RNN) and LLMs (BERT, RoBERTa) to classify sentiment and gendered language in political discourse, achieving up to 86% accuracy.",
    ],
    tech: ["PowerBI", "Python", "SNScrape", "Google Translate API", "BERT", "RoBERTa", "Deep Learning"],
  },
  {
    role: "Software Development Intern",
    company: "Avioryn",
    location: "Surat, India",
    dates: "Jun 2022 – Aug 2022",
    logoSrc: "/experience/Avioryn.jpeg",
    logoAlt: "Avioryn",
    bullets: [
      'Co-developed key modules for “LivLaundry”, a full-stack laundry logistics platform, including real-time product tracking and OTP-based user authentication using Node.js, MongoDB, and 2Factor API.',
      "Implemented QR code generation and password recovery in JavaScript, streamlining product handoff and reducing manual tracking errors across partner operations.",
      "Collaborated with 2 UX designers to build data-driven dashboards, optimizing usability for multiple user personas.",
      "Operated within an Agile team of 5 using ClickUp for task management and Slack for real-time collaboration.",
    ],
    tech: ["Node.js", "MongoDB", "JavaScript", "2Factor API", "Agile", "ClickUp", "Slack"],
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
