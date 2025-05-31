// * ----- Third-party Packages -----
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// * ----- models -----
import UserModel from "../models/User";

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
      expiresIn: "2days",
    }
  );

  // return data to controller
  return {
    user: { ...user.toObject(), password: undefined },
    accessToken,
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
    { expiresIn: "2days" }
  );

  return {
    user: { ...user.toObject(), password: undefined },
    accessToken,
  };
};
