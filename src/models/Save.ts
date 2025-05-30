import mongoose from "mongoose";
const Schema = mongoose.Schema;

// create save schema
const saveSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

// create save model (for save post)
export default mongoose.model("Save", saveSchema);
