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
            react: ['react', 'react-dom'],
            mui: ['@mui/material'],
            muiBase: ['@mui/base'],
            muiIcon: ['@mui/icons-material'],
            muiLab: ['@mui/lab'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            form: ['react-hook-form', '@hookform/resolvers', 'yup'],
            vendor: ['lodash', 'dayjs'],
            swagger: ['swagger-jsdoc', 'swagger-ui-express', 'yamljs'],
          },
        },
      },
    },
  };
});
