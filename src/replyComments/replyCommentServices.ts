// * ----- DTO -----
import ReplyComment from "./dto/replyCommentDto";

// * ----- Models -----
import UserModel from "../models/User";
import PostModel from "../models/Post";
import CommentModel from "../models/Comment";
import ReplyCommentModel from "../models/ReplyComment";

// add reply comment service
export const create = async (body: ReplyComment) => {
  const { post: postID, user: userID, parent: parentID, content } = body;

  // Checking the existence of the user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new Error("User not found!");

  // Checking the existence of the post
  const post = await PostModel.findOne({ _id: postID });
  if (!post) throw new Error("Post not found!");

  // Checking the existence of the parent comment
  const parent = await CommentModel.findOne({ _id: parentID });
  if (!parent) throw new Error("Parent comment not found!");

  // create reply comment
  const comment = new ReplyCommentModel({
    post: post._id,
    user: user._id,
    parent: parent._id,
    content,
  });

  return comment;
};
