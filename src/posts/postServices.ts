import ClientError from "../errors/clientError";
// * ----- models -----
import PostModel from "../models/Post";
import UserModel from "../models/User";
import LikeModel from "../models/Like";
import SaveModel from "../models/Save";
import CommentModel from "../models/Comment";

// * ----- DTO -----
import Post from "./dto/postDto";

// create post service
export const addPost = async (body: Post) => {
  const { desc, tags, user: userID } = body;

  // get user by userID
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User Not Found!", 404);

  // TODO => upload media

  // Create new post
  const post = new PostModel({
    media: {
      filename: "test filename",
      path: "test path",
    },
    desc,
    tags,
    user: user._id,
  });

  await post.save();

  return post;
};

// delete post service
export const deletePost = async (userID: string, postID: string) => {
  // get user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // get post
  const post = await PostModel.findOne({ _id: postID });
  if (!post || post.user.toString() !== user._id.toString())
    throw new ClientError("Cant remove this post!", 400);

  // TODO => delete post media

  // Delete likes, comments, saved posts, and post
  await LikeModel.deleteMany({ post: postID });
  await SaveModel.deleteMany({ post: postID });
  await CommentModel.deleteMany({ post: postID });

  await PostModel.findByIdAndDelete(postID);

  return;
};
