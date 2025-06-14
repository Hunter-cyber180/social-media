import ClientError from "../errors/clientError";

// * ----- models -----
import UserModel from "../models/User";

// upload profile service
export const profile = async (userID: string, file: any) => {
  // check file upload
  if (!file) throw new ClientError("Please upload your profile!", 400);

  // handle upload path
  const { filename } = file;
  const path = `images/profiles/${filename}`;

  // update user profile and check existing user
  const user = await UserModel.findOneAndUpdate(
    { _id: userID },
    { profilePic: path },
    { new: true } // Return updated user document
  );
  if (!user) throw new ClientError("User not found!", 404);

  return;
};
