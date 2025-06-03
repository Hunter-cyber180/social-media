import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const ValidationMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let validationErrors = [];

    // validate request body
    const validationSchema = plainToInstance(schema, req.body);
    validate(validationSchema, {}).then((errors) => {
      if (errors.length) {
        const { property, constraints } = errors[0];

        // Pushing the error along with its message to display to the user
        validationErrors.push({
          field: property,
          messages: [constraints],
        });

        // show validation errors
        return res.status(400).json(validationErrors);
      }

      next();
    });
  };
};

export default ValidationMiddleware;
