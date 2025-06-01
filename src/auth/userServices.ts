// * ----- Third-party Packages -----
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// * ----- models -----
import UserModel from "../models/User";
import RefreshTokenModel from "../models/RefreshToken";

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
      expiresIn: "15s",
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
    { expiresIn: "15s" }
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
    { expiresIn: "15s" }
  );

  // create new refresh token
  const newRefreshToken = await RefreshTokenModel.createToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
