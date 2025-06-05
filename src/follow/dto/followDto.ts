import { Types } from "mongoose";

// Follow Interface
export default interface Follow {
  follower: Types.ObjectId;
  following: Types.ObjectId;
}
