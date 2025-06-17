import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

// create router
const router: Router = Router();
 
// define swagger options
const options = {
  customCss: `
  .swagger-ui .topbar { display: block };
  .swagger-ui .btn { background-color: #28a745; color: white };
  .models { display: block };
  body { font-family: Arial, sans-serif };
`,
};

// setup swagger for api docs
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// export router
export default router;
