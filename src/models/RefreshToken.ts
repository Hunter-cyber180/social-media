import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create refresh token schema
const refreshTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  expireTime: { type: Date, required: true },
});

// create refresh token model
const model = mongoose.model("RefreshToken", refreshTokenSchema);

export default model;
