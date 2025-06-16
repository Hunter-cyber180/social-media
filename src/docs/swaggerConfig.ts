import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const router: Router = Router();

const options = {
  customCss: `
  .swagger-ui .topbar { display: block };
  .swagger-ui .btn { background-color: #28a745; color: white };
  .models { display: block };
  body { font-family: Arial, sans-serif };
`,
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

export default router;
