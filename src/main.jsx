import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Handles mounting the React app to index.html

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
