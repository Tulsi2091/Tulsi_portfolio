import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: "rgba(255,255,255,.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: "rgba(20,20,20,.08)",
        boxShadow: "0 4px 12px rgba(0,0,0,.04)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-[15px] font-semibold tracking-wide"
          style={{ color: "var(--ink)" }}
        >
          Tulsi Patel
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-[15px]">
          {[
            { label: "Home", to: "/" },
            { label: "Chat", to: "/chat" },
            { label: "Education", to: "/education" },
            { label: "Projects", to: "/projects" },
            { label: "Experience", to: "/experience" },
            { label: "Skills", to: "/skills" },
            // { label: "Contact", to: "/contact" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="transition"
              style={{
                color: isActive(to)
                  ? "var(--accent)"
                  : "var(--ink)",
                fontWeight: isActive(to) ? 600 : 400,  
                opacity: isActive(to) ? 1 : 0.75,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = isActive(to) ? "1" : "0.75")
              }
            >
              {label}
            </Link>
          ))}

          {/* Resume */}
          <Link
            to="/resume"
            className="ml-2 rounded-full px-4 py-1.5 text-sm font-medium transition"
            style={{
              background: "linear-gradient(90deg, var(--accent), var(--accent2))",
              color: "white",
              boxShadow: "0 8px 20px rgba(176,137,104,.25)",
            }}
          >
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
