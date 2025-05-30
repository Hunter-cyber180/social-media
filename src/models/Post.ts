import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create post schema
const postsSchema = new Schema(
  {
    media: {
      path: { type: String, required: true },
      filename: { type: String, required: true },
    },
    desc: { type: String, required: true }, // post description
    tags: { type: [String] },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// create post model
export default mongoose.model("Post", postsSchema);
