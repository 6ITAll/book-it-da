import express from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';

const app = express();
const PORT = 5174;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
