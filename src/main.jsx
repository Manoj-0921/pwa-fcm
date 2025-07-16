import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Use plugin-based registration (don't register manually)
import { registerSW } from 'virtual:pwa-register';
registerSW({ immediate: true });
