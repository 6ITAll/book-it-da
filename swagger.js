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
        url: 'http://localhost:5173',
      },
    ],
  },
  apis: ['./src/features/**/*.ts', './src/components/**/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
