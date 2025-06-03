// * ----- built in packages -----
import crypto from "crypto";
import path from "path";
import fs from "fs";

// * ----- Third-party Packages -----
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// * ----- models -----
import UserModel from "../models/User";
import RefreshTokenModel from "../models/RefreshToken";
import ResetPasswordModel from "../models/ResetPassword";

// * ----- DTO -----
import { User, UserRegister } from "./dto/userDto";

// register user
export const register = async (body: UserRegister) => {
  const { username, email } = body;

  // Checking the existence of the user
  const isUserExist = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) throw new Error("Duplicate username or email!");

  // create and save user in UserModel
  const user = new UserModel(body);
  await user.save();

  // create user token (access token)
  const accessToken = jwt.sign(
    { userID: user._id },
    process.env.ACCESS_TOKEN_KEY as string,
    {
      expiresIn: "1min",
    }
  );

  const refreshToken = await RefreshTokenModel.createToken(user);

  // return data to controller
  return {
    user: { ...user.toObject(), password: undefined },
    accessToken,
    refreshToken,
  };
};

// login user
export const login = async (body: User) => {
  const { email, password } = body;

  //  Checking the existence of the user
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found!");

  //   Checking the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Email or Password is not valid!");

  //   create user token (access token)
  const accessToken = jwt.sign(
    { userID: user._id },
    process.env.ACCESS_TOKEN_KEY as string,
    { expiresIn: "1min" }
  );

  const refreshToken = await RefreshTokenModel.createToken(user);

  return {
    user: { ...user.toObject(), password: undefined },
    accessToken,
    refreshToken,
  };
};

// create new access token by refresh token
export const refreshToken = async (token: string) => {
  // verify refresh token
  const userID = await RefreshTokenModel.verifyToken(token);
  if (!userID) throw new Error("Token is not valid!");

  // delete refresh token
  await RefreshTokenModel.findOneAndDelete({ token });

  const user = await UserModel.findById(userID);
  if (!user) throw new Error("User not found!");

  // create access token
  const accessToken = jwt.sign(
    { userID: user._id },
    process.env.ACCESS_TOKEN_KEY as string,
    { expiresIn: "1min" }
  );

  // create new refresh token
  const newRefreshToken = await RefreshTokenModel.createToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

// forget password
export const forgetPassword = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found!");

  // create a token with expire time
  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpireTime = Date.now() + 60 * 60 * 1000;

  const resetPassword = new ResetPasswordModel({
    user: user._id,
    token,
    tokenExpireTime,
  });

  await resetPassword.save();

  // html template for send email
  const templatePath = path.join(__dirname, "../templates/reset-password.html");
  let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  // replace reset link in template
  const resetLink = "my reset link"; // TODO => set reset link
  htmlTemplate = htmlTemplate.replace("{{reset_link}}", resetLink);

  // nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  // nodemailer options
  const options = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: email,
    subject: "Reset Password Link For Your Social Account",
    html: htmlTemplate,
  };

  // send email to user
  transporter.sendMail(options);

  return {
    token,
  };
};

// reset password
export const resetPassword = async (token: string, password: string) => {
  // get reset password by token
  const resetPasswd = await ResetPasswordModel.findOne({
    token,
    tokenExpireTime: { $gt: Date.now() },
  });

  if (!resetPasswd) throw new Error("Invalid or expired token!");

  const user = await UserModel.findOne({ _id: resetPasswd.user });
  if (!user) throw new Error("User not found!");

  // hash new password
  const hashedPasswd = await bcrypt.hash(password, 10);

  // update user password
  await UserModel.findOneAndUpdate(
    {
      _id: user._id,
    },
    { password: hashedPasswd }
  );

  // delete reset password doc
  await ResetPasswordModel.findOneAndDelete({ _id: resetPasswd._id });

  return;
};
