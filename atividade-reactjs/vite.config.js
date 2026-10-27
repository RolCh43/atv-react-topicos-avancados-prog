import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite. "host: true" permite acessar o servidor pelo Codespaces.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
