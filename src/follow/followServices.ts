import ClientError from "../errors/clientError";

// * ----- models -----
import UserModel from "../models/User";
import FollowModel from "../models/Follow";

export const follow = async (userID: string, pageID: string) => {
  const user = await UserModel.findOne({ _id: userID });
  if(!user)
    throw new ClientError("User not found!", 404);

  const page = await UserModel.findOne({ _id: pageID });
  if (!page) throw new ClientError("Page not found to follow!", 404);

  if (user._id.toString() === pageID)
    throw new ClientError("You cannot follow yourself!", 400);

  const existingFollow = await FollowModel.findOne({
    follower: user._id,
    following: pageID,
  });

  if (existingFollow) throw new ClientError("Page already followed!", 400);

  const follow = await FollowModel.create({
    follower: user._id,
    following: pageID,
  });

  return follow;
};
