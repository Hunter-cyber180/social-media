import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

// Interface for static methods
interface IRefreshTokenModel extends mongoose.Model<IRefreshTokenDoc> {
  createToken(user: any): Promise<string>;
  verifyToken(token: string): Promise<mongoose.Types.ObjectId | null>;
}

// Interface for document
interface IRefreshTokenDoc extends mongoose.Document {
  token: string;
  user: mongoose.Types.ObjectId;
  expireTime: Date;
}

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

// verify refresh token
refreshTokenSchema.statics.verifyToken = async (token) => {
  // get refresh token with having an expiration
  const refreshTokenDocument = await model.findOne({
    token,
    expireTime: { $gte: new Date() },
  });

  return refreshTokenDocument ? refreshTokenDocument.user : null;
};

// create refresh token model
const model = mongoose.model<IRefreshTokenDoc, IRefreshTokenModel>(
  "RefreshToken",
  refreshTokenSchema
);

export default model;
