import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import YAML from 'yamljs';
import swaggerJsdoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load(resolve(__dirname, './docs/swagger.yaml'));

const options = {
  definition: swaggerDocument,
  apis: [],
};

const specs = swaggerJsdoc(options);

export default specs;
