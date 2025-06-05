import { Types } from "mongoose";

// save Interface
export default interface Save {
  user: Types.ObjectId;
  post: Types.ObjectId;
}
