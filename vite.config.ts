import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Optional: Define `env` variables globally for usage if needed
    define: {
      'process.env': env, // Expose the loaded environment variables globally
    },
  });
};
