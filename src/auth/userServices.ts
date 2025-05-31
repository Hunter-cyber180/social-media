// * ----- Third-party Packages -----
import jwt from "jsonwebtoken";

// * ----- models -----
import UserModel from "../models/User";

// * ----- DTO -----
import User from "./dto/userDto";

// register user
export const register = async (body: User) => {
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
