import ClientError from "../errors/clientError";

// * ----- models -----
import UserModel from "../models/User";
import PostModel from "../models/Post";
import SaveModel from "../models/Save";
import LikeModel from "../models/Like";

// save service
export const save = async (userID: string, postID: string) => {
  // get user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // get post
  const post = await PostModel.findOne({ _id: postID });
  if (!post) throw new ClientError("Post not found!", 404);

  // TODO => create access page

  // check existing save
  const existingSave = await SaveModel.findOne({
    user: user._id,
    post: post._id,
  });
  if (existingSave) return;

  // create save
  await SaveModel.create({ post: post._id, user: user._id });

  return;
};

// unsave service
export const unsave = async (userID: string, postID: string) => {
  // delete save
  const save = await SaveModel.findOneAndDelete({
    user: userID,
    post: postID,
  });

  // check existing save
  if (!save) throw new ClientError("Save not found!", 404);

  return;
};

// show saves
export const getAllSaves = async (userID: string) => {
  // get user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // get saves
  const saves = await SaveModel.find({ user: user._id })
    .populate({
      path: "post",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .lean();

  // TODO => set haslike property for user like

  return { saves, user };
};
