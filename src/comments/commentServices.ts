// * ----- DTO -----
import Comment from "./dto/commentDto";

// * ----- models -----
import CommentModel from "../models/Comment";
import PostModel from "../models/Post";
import UserModel from "../models/User";

import ClientError from "../errors/clientError";

// add comment
export const create = async (body: Comment) => {
  const { post: postID, user: userID, content } = body;

  // Checking the existence of the user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User not found!", 404);

  // Checking the existence of the post
  const post = await PostModel.findOne({ _id: postID });
  if (!post) throw new ClientError("Post not found!", 404);

  // create comment
  const comment = new CommentModel({ post: post._id, user: user._id, content });
  await comment.save();

  return comment;
};
