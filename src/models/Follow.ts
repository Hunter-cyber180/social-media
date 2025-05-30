import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create follow schema
const followSchema = new Schema(
  {
    follower: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    following: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// create follow model
export default mongoose.model("Follow", followSchema);
