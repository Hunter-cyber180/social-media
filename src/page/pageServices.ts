import ClientError from "../errors/clientError";

// * ----- Models -----
import UserModel from "../models/User";
import FollowModel from "../models/Follow";
import LikeModel from "../models/Like";
import SaveModel from "../models/Save";
import PostModel from "../models/Post";

// get user page service
export const getUserPage = async (userID: string, pageID: string) => {
  // get user by userID and check existing user
  const user = await UserModel.findOne({ _id: userID });
  if (!user) throw new ClientError("User Not Found!", 404);

  // get page by pageID and check existing page
  const page = await UserModel.findOne(
    { _id: pageID },
    "name isVerified username profilePic bio"
  ).lean();
  if (!page) throw new ClientError("Page not found!", 404);

  // TODO => add has access to page code

  // Checking if user has followed the page
  const isFollowed = await FollowModel.findOne({
    following: pageID,
    follower: userID,
  });

  // get page followings
  let followings = await FollowModel.find({ follower: pageID }).populate(
    "following",
    "name username"
  );
  followings = followings.map((item: { following: any }) => item.following);

  // get page followers
  let followers = await FollowModel.find({ following: pageID }).populate(
    "follower",
    "name username"
  );
  followers = followers.map((item: { follower: any }) => item.follower);

  // get page posts
  const posts = await PostModel.find({ user: pageID })
    .sort({ _id: -1 })
    .populate("user", "name profilePic username")
    .lean();

  // get page saves
  const saves = await SaveModel.find({ user: user._id })
    .populate("post", "_id")
    .populate("user", "_id");

  // get page likes
  const likes = await LikeModel.find({ user: user._id })
    .populate("post", "_id")
    .populate("user", "_id");

  // Checking if user owns their page
  const isUserPage = user._id.toString() === page._id.toString();

  // return data
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
