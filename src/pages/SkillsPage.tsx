import { useState } from "react";
import type { ReactNode } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import {
  SiPython,
  SiC,
  SiCplusplus,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSolidity,
  SiSnowflake,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiAmazon,
  SiDocker,
  SiGit,
  SiLinux,
  SiApachehadoop,
  SiKubernetes,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiFastapi,
  SiStreamlit,
  SiDjango,
  SiFlask,
  SiHuggingface,
  SiLangchain,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiPlotly,
  SiStripe,
  SiPostman,
  SiSwagger,
  SiJsonwebtokens,
  SiVercel,
  SiGooglecloud,
  SiGithub,
} from "react-icons/si";

import {
  DiJava
} from "react-icons/di";

type Skill = {
  name: string;
  icon: ReactNode;
  hoverColor: string; 
};

type SkillGroup = {
  title: string;
  subtitle?: string;
  items: Skill[];
  chips?: string[]; 
};


const groups: SkillGroup[] = [
  {
    title: "Programming Languages",
    subtitle: "Languages I use across systems, full-stack, and ML workflows.",
    items: [
      
      { name: "Python", icon: <SiPython />, hoverColor: "#3776AB" },
      { name: "JavaScript", icon: <SiJavascript />, hoverColor: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript />, hoverColor: "#3178C6" },
      { name: "HTML", icon: <SiHtml5 />, hoverColor: "#E34F26" },
      { name: "CSS", icon: <SiCss3 />, hoverColor: "#1572B6" },
      { name: "C", icon: <SiC />, hoverColor: "#A8B9CC" },
      { name: "C++", icon: <SiCplusplus />, hoverColor: "#00599C" },
      { name: "Java", icon: <DiJava />, hoverColor: "#306998" },
      { name: "Golang", icon: <SiGo />, hoverColor: "#00ADD8" },
      { name: "Solidity", icon: <SiSolidity />, hoverColor: "#363636" },
    ],
  },
  {
    title: "Databases + Cloud",
    subtitle: "Storage, analytics, and cloud-native tooling.",
    items: [
      { name: "Snowflake", icon: <SiSnowflake />, hoverColor: "#29B5E8" },
      { name: "PostgreSQL", icon: <SiPostgresql />, hoverColor: "#4169E1" },
      { name: "MySQL", icon: <SiMysql />, hoverColor: "#4479A1" },
      { name: "MongoDB", icon: <SiMongodb />, hoverColor: "#47A248" },
      { name: "Docker", icon: <SiDocker />, hoverColor: "#2496ED" },
      { name: "AWS", icon: <SiAmazon />, hoverColor: "#FF9900" },
      { name: "GCP", icon: <SiGooglecloud />, hoverColor: "#4285F4" },
      { name: "Linux", icon: <SiLinux />, hoverColor: "#FCC624" },
      { name: "Git", icon: <SiGit />, hoverColor: "#F05032" },
      { name: "Hadoop", icon: <SiApachehadoop />, hoverColor: "#66CCFF" },
      { name: "Kubernetes", icon: <SiKubernetes />, hoverColor: "#326CE5" },
    ],
  },
  {
    title: "Frameworks + ML",
    subtitle: "Frameworks & libraries for LLM apps, ML, and full-stack.",
    items: [
      { name: "React", icon: <SiReact />, hoverColor: "#61DAFB" },
      { name: "Node.js", icon: <SiNodedotjs />, hoverColor: "#339933" },
      { name: "Tailwind", icon: <SiTailwindcss />, hoverColor: "#06B6D4" },
      { name: "FastAPI", icon: <SiFastapi />, hoverColor: "#009688" },
      { name: "Streamlit", icon: <SiStreamlit />, hoverColor: "#FF4B4B" },
      { name: "Django", icon: <SiDjango />, hoverColor: "#092E20" },
      { name: "Flask", icon: <SiFlask />, hoverColor: "#111111" },
      { name: "Hugging Face", icon: <SiHuggingface />, hoverColor: "#FFD21E" },
      { name: "LangChain", icon: <SiLangchain />, hoverColor: "#2E7D32" },
      { name: "TensorFlow", icon: <SiTensorflow />, hoverColor: "#FF6F00" },
      { name: "PyTorch", icon: <SiPytorch />, hoverColor: "#EE4C2C" },
      { name: "OpenCV", icon: <SiOpencv />, hoverColor: "#5C3EE8" },
      { name: "Scikit-learn", icon: <SiScikitlearn />, hoverColor: "#F7931E" },
      { name: "NumPy", icon: <SiNumpy />, hoverColor: "#013243" },
      { name: "pandas", icon: <SiPandas />, hoverColor: "#150458" },
      { name: "Jupyter", icon: <SiJupyter />, hoverColor: "#F37626" },
    ],
  },
  {
    title: "APIs + Product Tooling",
    subtitle: "Building, testing, and shipping real products.",
    items: [
      { name: "Postman", icon: <SiPostman />, hoverColor: "#FF6C37" },
      { name: "Swagger / OpenAPI", icon: <SiSwagger />, hoverColor: "#85EA2D" },
      { name: "JWT Auth", icon: <SiJsonwebtokens />, hoverColor: "#111111" },
      { name: "Plotly", icon: <SiPlotly />, hoverColor: "#3F4F75" },
      { name: "Stripe", icon: <SiStripe />, hoverColor: "#635BFF" },
      { name: "GitHub", icon: <SiGithub />, hoverColor: "#181717" },
      { name: "Vercel", icon: <SiVercel />, hoverColor: "#000000" },
    ],
  },
];

const pageAnim: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
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

const groupsWrapAnim: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const groupAnim: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const gridAnim: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.06 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: "easeOut" },
  },
};


function GroupHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
          {title}
        </h2>
        <div
          className="hidden h-px flex-1 md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,20,20,.10), var(--accent), transparent)",
            opacity: 0.35,
          }}
        />
      </div>
      {subtitle ? (
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs"
      style={{
        border: "1px solid rgba(20,20,20,.08)",
        background: "rgba(255,255,255,.45)",
        boxShadow: "0 8px 20px rgba(15,15,15,.03)",
        color: "var(--ink)",
      }}
    >
      {children}
    </span>
  );
}

function SkillCard({ name, icon, hoverColor }: Skill) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      variants={cardAnim}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-4
                 transition will-change-transform hover:-translate-y-0.5"
      style={{
        border: "1px solid rgba(20,20,20,.06)",
        background: "rgba(255,255,255,.45)",
        boxShadow: "0 10px 24px rgba(15,15,15,.03)",
      }}
    >
      <div
        className="text-[28px] transition"
        style={{
          color: hover ? hoverColor : "var(--accent)",
          opacity: hover ? 1 : 0.92,
          transform: hover ? "translateY(-1px)" : "translateY(0px)",
        }}
      >
        {icon}
      </div>

      <div
        className="text-xs font-medium tracking-wide text-center"
        style={{ color: "rgba(20,20,20,.78)" }}
      >
        {name}
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  return (
    <motion.main
      className="mx-auto max-w-5xl px-4 py-16"
      variants={pageAnim}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div className="text-center" variants={headerAnim}>
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold tracking-tight">
          <WrenchScrewdriverIcon className="h-8 w-8" style={{ color: "var(--accent)" }} />
          Skills
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          A curated view of the languages, frameworks, and tools I use.
        </p>

      </motion.div>

      
      <motion.section
        className="mx-auto mt-10 max-w-4xl space-y-12"
        variants={groupsWrapAnim}
        initial="hidden"
        animate="show"
      >
        {groups.map((g) => (
          <motion.div key={g.title} variants={groupAnim}>
            <GroupHeader title={g.title} subtitle={g.subtitle} />

            <motion.div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              variants={gridAnim}
              initial="hidden"
              animate="show"
            >
              {g.items.map((s) => (
                <SkillCard key={s.name} {...s} />
              ))}
            </motion.div>

            {g.chips?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {g.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            ) : null}
          </motion.div>
        ))}
      </motion.section>
    </motion.main>
  );
}
