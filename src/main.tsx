import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { RouterProvider } from "react-router";
import { routes } from "./routes";
import { ModalProvider } from "./contexts/ModelContext";
import ErrorBoundary from "./components/error/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // ✅ Log ke service monitoring (Sentry, etc)
        console.error("App Level Error:", error, errorInfo);
      }}
    >
      <ModalProvider>
        <RouterProvider router={routes} />
      </ModalProvider>
    </ErrorBoundary>
  </StrictMode>
);
