import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import AnimatedPage from "../components/AnimatedPage";

function Chip({ children }: { children: string }) {
  return (
    <span
      className="chip rounded-full px-3 py-1 text-xs"
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

function Group({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-5">
      <div
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((x) => (
          <Chip key={x}>{x}</Chip>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  title,
  subtitle,
  minor,
  rightMeta,
  logoSrc,
  logoAlt,
  children,
}: {
  title: string;
  subtitle: string;
  minor?: string;
  rightMeta?: string[];
  logoSrc?: string;
  logoAlt?: string;
  children: React.ReactNode;
}) {
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
        className="absolute left-[5px] top-7 h-[calc(100%-14px)] w-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,20,20,.16), rgba(20,20,20,.03))",
        }}
      />

      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          {/* Title row with optional logo */}
          <div className="mt-1 flex items-center gap-3 leading-none">
            {logoSrc ? (
              <div
                className="flex items-center rounded-lg px-2 py-1"
                style={{
                  background: "rgba(255,255,255,.35)",
                  border: "1px solid rgba(20,20,20,.06)",
                }}
              >
                <img
                  src={logoSrc}
                  alt={logoAlt || title}
                  className="h-6 w-auto object-contain opacity-100"
                  style={{ filter: "none" }}
                />
              </div>
            ) : null}

            <h3 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
              {title}
            </h3>
          </div>

          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {subtitle}
          </p>

          {minor && (
            <p className="mt-0.5 text-sm italic" style={{ color: "var(--muted)" }}>
              {minor}
            </p>
          )}
        </div>

        {rightMeta?.length ? (
          <div
            className="text-sm md:text-right md:max-w-[220px]"
            style={{ color: "var(--muted)" }}
          >
            {rightMeta.map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Timeline stagger animations (typed for TS + verbatimModuleSyntax) */
const listAnim: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function EducationPage() {
  return (
    <AnimatedPage className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold tracking-tight">
          <AcademicCapIcon className="h-8 w-8" style={{ color: "var(--accent)" }} />
          Education
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          A course-focused view of my graduate and undergraduate coursework.
        </p>
      </div>

      {/* Timeline */}
      <section className="mx-auto mt-12 max-w-4xl px-2">
        <div
          className="mb-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.35,
          }}
        />

        <motion.div className="space-y-14" variants={listAnim} initial="hidden" animate="show">
          {/* ASU */}
          <motion.div variants={itemAnim}>
            <TimelineItem
              title="Arizona State University"
              subtitle="Master of Computer Science (MCS)"
              rightMeta={["August 2023 - May 2025", "GPA: 4.00"]}
              logoSrc="/education/Asu_logo.png"
              logoAlt="ASU"
            >
              <Group
                label="ML + Data"
                items={[
                  "Data Mining",
                  "Statistical Machine Learning",
                  "Natural Language Processing",
                  "Data Visualization",
                ]}
              />
              <Group
                label="Systems + Scale"
                items={[
                  "Data Processing at Scale",
                  "Knowledge Representation",
                ]}
              />
              <Group
                label="Security + Quality"
                items={[
                  "Information Assurance & Security",
                  "Software Security",
                  "Software Verification/Validation/Test",
                ]}
              />
              <Group label="Special Topic" items={["Engineering Blockchain Apps"]} />
            </TimelineItem>
          </motion.div>

          {/* NIRMA */}
          <motion.div variants={itemAnim}>
            <TimelineItem
              title="Nirma University, Ahmedabad"
              subtitle="B.Tech in Computer Science and Engineering"
              minor="Minor in Finance"
              rightMeta={["July 2019 - May 2023", "GPA: 7.87/10"]}
              logoSrc="/education/Nirma_logo.jpg"
              logoAlt="Nirma University"
            >
              <Group
                label="Core CS"
                items={[
                  "Data Structures and Algorithms",
                  "Design and Analysis of Algorithms",
                  "Operating Systems",
                  "Database Management Systems",
                  "Computer Networks",
                  "Computer Architecture",
                  "Theory of Computation",
                  "Compiler Construction",
                ]}
              />
              <Group
                label="AI / ML"
                items={[
                  "Machine Learning",
                  "Artificial Intelligence",
                  "Natural Language Processing",
                  "Big Data Analytics",
                ]}
              />
              <Group
                label="Software + Cloud"
                items={["Software Engineering", "Cloud Computing", "Web Technologies"]}
              />
              <Group
                label="Math & Foundations"
                items={[
                  "Discrete Mathematics",
                  "Graph Theory",
                  "Probability and Statistics",
                  "Linear Algebra",
                  "Calculus & Differential Equations",
                ]}
              />
              <Group
                label="Finance"
                items={[
                  "Cost & Financial Accounting",
                  "Corporate Finance",
                  "Project Planning and Control",
                  "Financial Management",
                  "Principles of Economics",
                  "Principles of Management",
                  "Entrepreneurship Development",
                ]}
              />
            </TimelineItem>
          </motion.div>
        </motion.div>
      </section>
    </AnimatedPage>
  );
}
