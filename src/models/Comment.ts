import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create comment schema
const commentsSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// create comment model
export default mongoose.model("Comment", commentsSchema);
