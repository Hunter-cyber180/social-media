import { Types } from "mongoose";

// media interface
export interface IMedia {
  path: string;
  filename: string;
}

// post interface
export default interface Post extends Document {
  media: IMedia;
  desc: string;
  tags?: string[];
  user: Types.ObjectId;
}
