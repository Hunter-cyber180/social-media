import ClientError from "../errors/clientError";

// * ----- models -----
import UserModel from "../models/User";
import FollowModel from "../models/Follow";

// follow page service
export const follow = async (userID: string, pageID: string) => {
  // get follower and check existing follower
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // get page and check existing page
  const page = await UserModel.findOne({ _id: pageID });
  if (!page) throw new ClientError("Page not found to follow!", 404);

  // check if follower and following are the same
  if (user._id.toString() === pageID)
    throw new ClientError("You cannot follow yourself!", 400);

  // check existing follow
  const existingFollow = await FollowModel.findOne({
    follower: user._id,
    following: pageID,
  });
  if (existingFollow) throw new ClientError("Page already followed!", 400);

  // create follow
  const follow = await FollowModel.create({
    follower: user._id,
    following: pageID,
  });

  return follow;
};

// unfollow page service
export const unFollow = async (userID: string, pageID: string) => {
  // get follow and delete the follow
  const page = await FollowModel.findOneAndDelete({
    follower: userID,
    following: pageID,
  });

  // check existing follow
  if (!page) throw new ClientError("You didn't follow this page", 404);

  return;
};
