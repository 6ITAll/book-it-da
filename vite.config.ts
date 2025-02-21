import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_ALADIN_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            mui: ['@mui/material'],
            muiX: ['@mui/x-date-pickers'],
            muiIcon: ['@mui/icons-material'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            quill: ['quill'],
            supabase: ['@supabase/supabase-js'],
            form: ['react-hook-form', '@hookform/resolvers', 'yup'],
            lodash: ['lodash', 'lodash-es'],
          },
        },
      },
    },
  };
});
