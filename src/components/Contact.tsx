import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Phone,
} from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Backdrop click to close */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <ActionIcon
                icon={<Mail />}
                href="mailto:tpatel73@asu.edu"
                label="Email"
              />

              <ActionIcon
                icon={<Linkedin />}
                href="https://linkedin.com/in/tulsi-patel2091"
                label="LinkedIn"
              />

              <ActionIcon
                icon={<Github />}
                href="https://github.com/Tulsi2091"
                label="GitHub"
              />

            </motion.div>
          )}
        </AnimatePresence>

        {/* Main floating button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((o) => !o)}
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            boxShadow: "0 18px 45px rgba(176,137,104,.35)",
            color: "white",
          }}
          aria-label="Contact"
        >
          <Phone className="h-4 w-4" />
        </motion.button>
      </div>
    </>
  );
}

/* ---------- Icon Button ---------- */

function ActionIcon({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ x: -4 }}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full"
      style={{
        background: "rgba(255,255,255,.85)",
        border: "1px solid rgba(20,20,20,.12)",
        boxShadow: "0 14px 30px rgba(0,0,0,.12)",
        color: "var(--ink)",
      }}
      aria-label={label}
    >
      {icon}

      {/* Tooltip */}
      <span
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full px-3 py-1 text-xs opacity-0 group-hover:opacity-100"
        style={{
          background: "rgba(20,20,20,.85)",
          color: "white",
          transition: "opacity 150ms ease",
        }}
      >
        {label}
      </span>
    </motion.a>
  );
}
