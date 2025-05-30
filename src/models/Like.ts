import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create like schema
const likesSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

// create like model (for like post)
export default mongoose.model("Like", likesSchema);
