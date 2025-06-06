import { Types } from "mongoose";

// comment DTO
export default interface Comment {
  user: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
}
