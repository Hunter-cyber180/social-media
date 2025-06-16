import ClientError from "../errors/clientError";

// * ----- Models -----
import UserModel from "../models/User";
import FollowModel from "../models/Follow";
import LikeModel from "../models/Like";
import SaveModel from "../models/Save";
import PostModel from "../models/Post";

export const getUserPage = async (userID: string, pageID: string) => {
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User Not Found!", 404);

  const page = await UserModel.findOne(
    { _id: pageID },
    "name isVerified username profilePic bio"
  ).lean();
  if (!page) throw new ClientError("Page not found!", 404);

  // TODO => add has access to page code

  const isFollowed = await FollowModel.findOne({
    following: pageID,
    follower: userID,
  });

  let followings = await FollowModel.find({ follower: pageID }).populate(
    "following",
    "name username"
  );
  followings = followings.map((item: { following: any }) => item.following);

  let followers = await FollowModel.find({ following: pageID }).populate(
    "follower",
    "name username"
  );
  followers = followers.map((item: { follower: any }) => item.follower);

  const posts = await PostModel.find({ user: pageID })
    .sort({ _id: -1 })
    .populate("user", "name profilePic username")
    .lean();

  const saves = await SaveModel.find({ user: user._id })
    .populate("post", "_id")
    .populate("user", "_id");

  const likes = await LikeModel.find({ user: user._id })
    .populate("post", "_id")
    .populate("user", "_id");

  const isUserPage = user._id.toString() === page._id.toString();

  return {
    page,
    isUserPage,
    followers,
    followings,
    saves,
    likes,
    posts,
    isFollowed: Boolean(isFollowed),
  };
};
