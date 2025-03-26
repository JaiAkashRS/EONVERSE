import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"], // Ensure JSX files load properly
  },
  esbuild: {
    loader: "jsx", // Force JSX handling
    include: /src\/.*\.jsx?$/, 
  },
  base: "./", // Fix asset paths for relative loading
});
