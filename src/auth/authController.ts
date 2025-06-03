import { Request, Response, NextFunction, Router } from "express";
import ValidationMiddleware from "../middlewares/validate";
import { LoginUserDto, RegisterUserDto } from "./dto/createUserDto";
import { User, UserRegister } from "./dto/userDto";
import { login, register } from "./authServices";

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

// login user
router.post(
  "/login",
  ValidationMiddleware(LoginUserDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get data from req.body and login user
    const body: User = req.body;
    const data = await login(body);

    // return json response
    res.status(201).json({
      message: "User Logined successfully!",
      data,
      success: true,
    });
  }
);

export default router;
