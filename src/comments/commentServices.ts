// * ----- DTO -----
import Comment from "./dto/commentDto";

// * ----- models -----
import CommentModel from "../models/Comment";
import PostModel from "../models/Post";
import UserModel from "../models/User";

// add comment
export const create = async (body: Comment) => {
  const { post: postID, user: userID, content } = body;

  // Checking the existence of the user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new Error("User not found!");

  // Checking the existence of the upost
  const post = await PostModel.findOne({ _id: postID });
  if (!post) throw new Error("Post not found!");

  // create comment
  const comment = new CommentModel({ post: post._id, user: user._id, content });
  await comment.save();

  return comment;
};
