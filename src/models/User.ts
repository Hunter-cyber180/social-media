import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

// hash password before save in model
usersSchema.pre("save", async function (next: any) {
  // If the password has not been changed, it will next.
  if (!this.isModified("password")) return next();

  try {
    // hash password
    this.password = await bcrypt.hash(this.password, 10); 
    next();
  } catch (error) {
    next(error);
  }
});

// create user model
export default mongoose.model("User", usersSchema);
