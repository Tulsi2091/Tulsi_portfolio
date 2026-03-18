import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
// import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/EducationPage";
import ResumePage from "./pages/ResumePage";
import Chat from "./pages/Chat";

import FloatingContact from "./components/Contact";



export default function App() {
  return (
    <>
      {/* Global grain overlay (warm, subtle texture) */}
      <div className="grain" />

      {/* App content */}
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path="/education" element={<EducationPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <FloatingContact />
        <Analytics />
      </div>

    </>
  );
}
