import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  tokenExpireTime: { type: Date, required: true },
});

export default mongoose.model("ResetPassword", resetPasswordSchema);
