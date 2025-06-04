import { Types } from "mongoose";

export default interface Comment {
    user: Types.ObjectId;
    post: Types.ObjectId;
    content: string;
}
