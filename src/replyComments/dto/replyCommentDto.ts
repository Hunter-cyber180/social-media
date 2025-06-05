import { Types } from "mongoose";

// reply comment Interface
export default interface ReplyComment {
  user: Types.ObjectId;
  post: Types.ObjectId;
  parent: Types.ObjectId;
  content: string;
}
