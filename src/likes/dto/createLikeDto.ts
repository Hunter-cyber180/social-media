import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

class CreateLikeDto {
  // user ID validation
  @IsNotEmpty({ message: "User Id can not be empty!" })
  @IsString({ message: "User Id type must be a string!" })
  @IsMongoId({ message: "User Id is not valid!" })
  user: Types.ObjectId;
}

export default CreateLikeDto;
