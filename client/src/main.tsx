import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

// Create Convex client only if URL is available
let convex: ConvexReactClient | null = null;
if (convexUrl) {
  try {
    convex = new ConvexReactClient(convexUrl);
  } catch (error) {
    console.error("Failed to initialize Convex client:", error);
  }
} else {
  console.warn("VITE_CONVEX_URL is not set. Please ensure Convex dev server is running and has finished initializing.");
}

const root = createRoot(document.getElementById("root")!);

// Render app with or without Convex provider
if (convex) {
  root.render(
  <ConvexAuthProvider client={convex}>
    <App />
    </ConvexAuthProvider>
);
} else {
  // Render app without Convex provider (for development/testing)
  root.render(<App />);
}
