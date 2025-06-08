import ClientError from "../errors/clientError";
import PostModel from "../models/Post";
import UserModel from "../models/User";

// create post service
export const addPost = async (desc: string, tags: string[], userID: string) => {
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
