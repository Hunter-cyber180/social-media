import { Types } from "mongoose";

// like interface
export default interface Like {
  user: Types.ObjectId;
  post: Types.ObjectId;
}
