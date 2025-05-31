import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

// create refresh token schema
const refreshTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  expireTime: { type: Date, required: true },
});

// create refresh token
refreshTokenSchema.statics.createToken = async (user) => {
  // set expire time for refresh token
  const expire = process.env.REFRESH_TOKEN_EXPIRE_TIME
    ? Number(process.env.REFRESH_TOKEN_EXPIRE_TIME)
    : 30;

  // create refresh token
  const refreshToken = `${user._id}-${v4()}`;

  // create and save new refresh token document in model
  const tokenDoc = new model({
    token: refreshToken,
    user: user._id,
    expireTime: new Date(Date.now() + expire * 24 * 3600 * 1000),
  });

  await tokenDoc.save();

  return refreshToken;
};

// create refresh token model
const model = mongoose.model("RefreshToken", refreshTokenSchema);

export default model;
