import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./tsx_src/App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./tsx_src/pages/Editor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  </StrictMode>,
);
