import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utility/i18";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    />
  </StrictMode>
);
