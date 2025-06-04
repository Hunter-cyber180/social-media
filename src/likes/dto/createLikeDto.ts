import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

// create like DTO
class CreateLikeDto {
  // user ID validation
  @IsNotEmpty({ message: "User Id can not be empty!" })
  @IsString({ message: "User Id type must be a string!" })
  @IsMongoId({ message: "User Id is not valid!" })
  user: Types.ObjectId;

  // post ID validation
  @IsNotEmpty({ message: "Post Id can not be empty!" })
  @IsString({ message: "Post Id type must be a string!" })
  @IsMongoId({ message: "Post Id is not valid!" })
  post: Types.ObjectId;
}

export default CreateLikeDto;
