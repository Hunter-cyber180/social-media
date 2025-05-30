import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create reply comment schema
const replyCommentSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Comment", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// create reply comment model
export default mongoose.model("ReplyComment", replyCommentSchema);
