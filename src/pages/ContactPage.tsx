// src/pages/ContactPage.tsx
import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  MessageCircle,
} from "lucide-react";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Contact2 } from "lucide-react";


const CONTACT = {
  name: "Tulsi Rajnikant Patel",
  phone: "602-283-6433",
  email: "tpatel73@asu.edu",
  linkedinLabel: "linkedin.com/in/tulsi-patel2091",
  linkedinUrl: "https://linkedin.com/in/tulsi-patel2091",
  githubLabel: "github.com/Tulsi2091",
  githubUrl: "https://github.com/Tulsi2091",
};

/* --------------------------- Animations (ONLY added) --------------------------- */

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
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const sectionAnim: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function CopyButton({ value, ariaLabel }: { value: string; ariaLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback (rare)
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium transition hover:-translate-y-0.5"
      style={{
        border: "1px solid rgba(20,20,20,.10)",
        background: "rgba(255,255,255,.55)",
        color: "var(--ink)",
        boxShadow: "0 10px 22px rgba(15,15,15,.04)",
      }}
      aria-label={ariaLabel}
      title="Copy"
    >
      {copied ? (
        <>
          <Check className="mr-1 h-4 w-4" style={{ color: "var(--accent)" }} />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-1 h-4 w-4" />
          Copy
        </>
      )}
    </button>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  copyValue,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
  badge?: string;
}) {
  return (
    <motion.div
      variants={itemAnim}
      className="relative overflow-hidden rounded-[26px] p-6 transition"
      style={{
        background: "rgba(255,255,255,.58)",
        border: "1px solid rgba(20,20,20,.10)",
        boxShadow: "0 22px 70px rgba(15,15,15,.08)",
      }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {/* soft glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 220px at 20% 0%, rgba(176,137,104,.14), transparent 55%)",
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(255,255,255,.60)",
            border: "1px solid rgba(20,20,20,.08)",
            boxShadow: "0 18px 45px rgba(0,0,0,.08)",
          }}
        >
          <div style={{ color: "var(--accent)" }}>{icon}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div
              className="text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: "var(--muted)" }}
            >
              {label}
            </div>
            {badge ? (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  border: "1px solid rgba(176,137,104,.28)",
                  background: "rgba(176,137,104,.10)",
                  color: "rgba(120,85,55,.95)",
                }}
              >
                {badge}
              </span>
            ) : null}
          </div>

          {href ? (
            <a
              href={href}
              target={
                href.startsWith("mailto:") || href.startsWith("tel:")
                  ? "_self"
                  : "_blank"
              }
              rel="noreferrer"
              className="mt-1 block truncate text-base font-semibold transition hover:opacity-90"
              style={{ color: "var(--ink)" }}
              title={value}
            >
              {value}
            </a>
          ) : (
            <div
              className="mt-1 truncate text-base font-semibold"
              style={{ color: "var(--ink)" }}
              title={value}
            >
              {value}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {copyValue ? (
              <CopyButton value={copyValue} ariaLabel={`Copy ${label}`} />
            ) : null}

            {href ? (
              <a
                href={href}
                target={
                  href.startsWith("mailto:") || href.startsWith("tel:")
                    ? "_self"
                    : "_blank"
                }
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium transition hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent), var(--accent2))",
                  color: "white",
                  boxShadow: "0 14px 30px rgba(176,137,104,.22)",
                }}
              >
                Open →
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <motion.main
      className="mx-auto max-w-5xl px-4 py-16"
      variants={pageAnim}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div className="text-center" variants={headerAnim}>
        <h1 className="inline-flex items-center justify-center gap-3 text-4xl font-bold tracking-tight">
  <Contact2 className="h-8 w-8" style={{ color: "var(--accent)" }} />
  Contact
</h1>

        <p
          className="mx-auto mt-3 max-w-2xl text-sm"
          style={{ color: "var(--muted)" }}
        >
          Reach out for roles, collaborations, or anything interesting.
        </p>

        <div
          className="mx-auto mt-12 h-px w-full max-w-4xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.35,
          }}
        />
      </motion.div>

      {/* Primary CTAs */}
      <motion.section
        className="mx-auto mt-10 max-w-4xl"
        variants={sectionAnim}
        initial="hidden"
        animate="show"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <motion.a
            variants={itemAnim}
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
              "Hello Tulsi — from your portfolio"
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-[22px] px-5 py-4 text-sm font-semibold transition"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), var(--accent2))",
              color: "white",
              boxShadow: "0 20px 46px rgba(176,137,104,.26)",
            }}
            whileHover={{ y: -2, boxShadow: "0 28px 60px rgba(176,137,104,.32)" }}
            whileTap={{ scale: 0.99 }}
          >
            <Send className="h-4 w-4" />
            Email Tulsi
          </motion.a>

          <motion.a
            variants={itemAnim}
            href={CONTACT.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[22px] px-5 py-4 text-sm font-semibold transition"
            style={{
              background: "rgba(255,255,255,.62)",
              border: "1px solid rgba(20,20,20,.12)",
              color: "var(--ink)",
              boxShadow: "0 20px 46px rgba(15,15,15,.10)",
            }}
            whileHover={{ y: -2, boxShadow: "0 30px 65px rgba(15,15,15,.14)" }}
            whileTap={{ scale: 0.99 }}
          >
            <MessageCircle
              className="h-4 w-4"
              style={{ color: "var(--accent)" }}
            />
            Message on LinkedIn
          </motion.a>
        </div>
      </motion.section>

      {/* Cards */}
      <motion.section
        className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2"
        variants={sectionAnim}
        initial="hidden"
        animate="show"
      >
        <ContactCard
          icon={<Mail className="h-5 w-5" />}
          label="Email"
          value={CONTACT.email}
          href={`mailto:${CONTACT.email}`}
          copyValue={CONTACT.email}
          badge="Preferred"
        />

        <ContactCard
          icon={<Phone className="h-5 w-5" />}
          label="Phone"
          value={CONTACT.phone}
          href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}
          copyValue={CONTACT.phone}
        />

        <ContactCard
          icon={<Linkedin className="h-5 w-5" />}
          label="LinkedIn"
          value={CONTACT.linkedinLabel}
          href={CONTACT.linkedinUrl}
          copyValue={CONTACT.linkedinUrl}
        />

        <ContactCard
          icon={<Github className="h-5 w-5" />}
          label="GitHub"
          value={CONTACT.githubLabel}
          href={CONTACT.githubUrl}
          copyValue={CONTACT.githubUrl}
        />
      </motion.section>
    </motion.main>
  );
}
