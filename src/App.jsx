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
          <div className="glow-cursor" />
          <div className="grid-bg" />
          <Home />
          <Analytics />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
