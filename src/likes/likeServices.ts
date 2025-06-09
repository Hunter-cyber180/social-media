import UserModel from "../models/User";
import PostModel from "../models/Post";
import LikeModel from "../models/Like";
import ClientError from "../errors/clientError";

// like service
export const like = async (userID: string, postID: string) => {
  // get user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // get post
  const post = await PostModel.findOne({ _id: postID });
  if (!post) throw new ClientError("Post not found!", 404);

  // TODO => create access page

  // check existing like
  const existingLike = await LikeModel.findOne({
    user: user._id,
    post: postID,
  });

  if (existingLike) return;

  // create new like and save
  const like = new LikeModel({ post: post._id, user: user._id });
  await like.save();

  return;
};
