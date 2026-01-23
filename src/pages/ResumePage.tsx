
import { FileText, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const RESUME = {
  name: "Tulsi Rajnikant Patel",
  pdfUrl: "/resume/Tulsi_Resume.pdf",
  email: "tpatel73@asu.edu",
};



export default function ResumePage() {
  return (
    <motion.main
      className="mx-auto max-w-5xl px-4 py-16"
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="inline-flex items-center justify-center gap-3 text-4xl font-bold tracking-tight">
          <FileText className="h-8 w-8" style={{ color: "var(--accent)" }} />
          Resume
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          Download my resume or preview it right here.
        </p>

        <div
          className="mx-auto mt-12 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.35,
          }}
        />
      </div>


      {/* Preview */}
      <section className="mx-auto mt-10 max-w-4xl">
        <div
          className="relative overflow-hidden rounded-[28px]"
          style={{
            background: "rgba(255,255,255,.58)",
            border: "1px solid rgba(20,20,20,.10)",
            boxShadow: "0 22px 70px rgba(15,15,15,.08)",
          }}
        >
          
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 260px at 20% 0%, rgba(176,137,104,.14), transparent 60%)",
            }}
          />

          <div className="relative z-10 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                  {RESUME.name}
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  Resume Preview
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <motion.a
                  href={RESUME.pdfUrl}
                  download
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,.65)",
                    border: "1px solid rgba(20,20,20,.10)",
                    color: "var(--ink)",
                  }}
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </motion.a>

                <motion.a
                  href={RESUME.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                    color: "white",
                    boxShadow: "0 14px 30px rgba(176,137,104,.22)",
                  }}
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Open
                </motion.a>
              </div>
            </div>

            <div
              className="mt-4 overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(20,20,20,.08)" }}
            >
              {/* Inline PDF preview */}
              <iframe
                title="Resume PDF"
                src={`${RESUME.pdfUrl}#view=FitH`}
                className="h-[900px] w-full"
                style={{
                  background: "transparent",
                }}
              />
            </div>

            
          </div>
        </div>
      </section>
    </motion.main>
  );
}
