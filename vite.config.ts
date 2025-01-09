import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 이 줄 추가

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
      middleware: [
        (req: Request, res: Response, next: NextFunction) => {
          if (req.url.startsWith('/api-docs')) {
            const app = express();
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
            app(req, res, next);
          } else {
            next();
          }
        },
      ],
    },
  };
});

// import.meta.env는 클라이언트 코드에서만 사용 가능하고,
// vite.config.ts에서는 loadEnv를 사용해야 합니다.
