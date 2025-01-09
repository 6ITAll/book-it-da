import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book-it-da API',
      version: '1.0.0',
      description: 'API documentation for Book-it-da project',
    },
    servers: [
      {
        url: 'http://localhost:5173', // 개발 서버 URL
      },
    ],
  },
  apis: ['./src/features/**/*.ts', './src/routes/*.ts'], // API 경로 패턴
};

const specs = swaggerJsdoc(options);

export default specs;
