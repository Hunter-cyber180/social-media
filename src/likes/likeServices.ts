import ClientError from "../errors/clientError";

// * ----- models -----
import UserModel from "../models/User";
import PostModel from "../models/Post";
import LikeModel from "../models/Like";

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

// unlike service
export const unlike = async (userID: string, postID: string) => {
  // get user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // get post
  const post = await PostModel.findOne({ _id: postID });
  if (!post) throw new ClientError("Post not found!", 404);

  // get like
  const like = await LikeModel.findOne({ user: user._id, post: post._id });
  if (!like) return;

  // delete like
  await LikeModel.findOneAndDelete({ _id: like._id });

  return;
};
