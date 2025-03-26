import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"], // ✅ Ensures .jsx files are correctly resolved
  },
  base: "./", // ✅ Ensures correct paths for Vite
});
