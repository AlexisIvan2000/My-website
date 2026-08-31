import { useEffect, useRef } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import { Analytics } from "@vercel/analytics/react"
import Home from "./screens/Home";
import "./App.css";

function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty("--mx", `${e.clientX}px`);
        glowRef.current.style.setProperty("--my", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app" ref={glowRef}>
          <div className="bg-aurora" aria-hidden="true">
            <span className="bg-veil bg-veil--1" />
            <span className="bg-veil bg-veil--2" />
            <span className="bg-veil bg-veil--3" />
          </div>
          <div className="bg-grain" aria-hidden="true" />
          <div className="glow-cursor" />
          <Home />
          <Analytics />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
