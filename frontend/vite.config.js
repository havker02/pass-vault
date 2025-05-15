import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      "bf0a242a-9709-4984-9165-a4370e878b32-00-1p2emzeulgzqy.pike.replit.dev"
    ]
  }
})
