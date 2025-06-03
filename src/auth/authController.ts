import { Request, Response, NextFunction, Router } from "express";
import ValidationMiddleware from "../middlewares/validate";
import { RegisterUserDto } from "./dto/createUserDto";
import { UserRegister } from "./dto/userDto";
import { register } from "./authServices";

const router = Router();

// register user
router.post(
  "/register",
  ValidationMiddleware(RegisterUserDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get data from req.body and register user
    const body: UserRegister = req.body;
    const data = await register(body);

    // return json response
    res.status(201).json({
      message: "User Registered successfully!",
      data,
      success: true,
    });
  }
);

export default router;
