import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

// follow DTO
class CreateFollowDto {
  // follower ID validation
  @IsNotEmpty({ message: "Follower Id can not be empty!" })
  @IsString({ message: "Follower Id type must be a string!" })
  @IsMongoId({ message: "Follower Id is not valid!" })
  follower: Types.ObjectId;
}

export default CreateFollowDto;
