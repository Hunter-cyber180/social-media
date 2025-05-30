import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create user schema
const usersSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, required: false },
    profilePic: { type: String, required: false }, // profile picture src
    isVerified: { type: Boolean, default: false }, // for verify user
    isPrivate: { type: String, default: false }, // private or public page
  },
  { timestamps: true }
);

// create user model
export default mongoose.model("User", usersSchema);
