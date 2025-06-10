import { Request, Response, NextFunction, Router } from "express";

// * ----- DTO -----
import { LoginUserDto, RegisterUserDto } from "./dto/createUserDto";
import { User, UserRegister } from "./dto/userDto";
import { ForgetPasswordDto, ResetPasswordDto } from "./dto/resetPasswordDto";

// * ----- middlewares -----
import ValidationMiddleware from "../middlewares/validate";

// * ----- services -----
import {
  forgetPassword,
  login,
  refreshToken,
  register,
  resetPassword,
} from "./authServices";

const router = Router();

// register user
router.post(
  "/register",
  ValidationMiddleware(RegisterUserDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from req.body and register user
      const body: UserRegister = req.body;
      const data = await register(body);

      // return json response
      res.status(201).json({
        message: "User Registered successfully!",
        data,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// login user
router.post(
  "/login",
  ValidationMiddleware(LoginUserDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from req.body and login user
      const body: User = req.body;
      const data = await login(body);

      // return json response
      res.status(200).json({
        message: "User Logined successfully!",
        data,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// refresh token
router.get(
  "/refresh/:token",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from req.params and create new access token
      const { token } = req.params;
      const data = await refreshToken(token);

      // return json response
      res.status(200).json({
        message: "Create Refresh Token was successfully!",
        data,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// forget password
router.post(
  "/forget-password",
  ValidationMiddleware(ForgetPasswordDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from req.body and sent reset password email
      const { email } = req.body;
      const { token } = await forgetPassword(email);

      // return json response
      res.status(200).json({
        message: "Password reset email sent.",
        data: { token },
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// reset password
router.post(
  "/reset-password",
  ValidationMiddleware(ResetPasswordDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from req.body and set new password for user
      const { token, password } = req.body;
      await resetPassword(token, password);

      // return json response
      res.status(200).json({
        message: "Set New Password was successfully!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
