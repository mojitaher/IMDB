import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // استفاده از IPv4 به جای ::1
    port: 5173, // یا هر پورت دلخواه مثل 3000
    strictPort: true, // اگر پورت آزاد نبود، خطا بده (برای شفافیت)
  },
});
