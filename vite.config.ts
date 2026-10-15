import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relative : le site fonctionne sous n'importe quel chemin (GitHub Pages, sous-dossier).
export default defineConfig({ base: "./", plugins: [react()] });
