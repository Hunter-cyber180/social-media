import ClientError from "../errors/clientError";

// * ----- models -----
import UserModel from "../models/User";
import PostModel from "../models/Post";
import SaveModel from "../models/Save";

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
