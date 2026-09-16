import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utility/i18";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "../authcontext/auth";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      />
    </AuthProvider>
  </StrictMode>
);
