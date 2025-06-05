import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

// follow DTO
class CreateFollowDto {
  // follower ID validation
  @IsNotEmpty({ message: "Follower Id can not be empty!" })
  @IsString({ message: "Follower Id type must be a string!" })
  @IsMongoId({ message: "Follower Id is not valid!" })
  follower: Types.ObjectId;

  // following ID validation
  @IsNotEmpty({ message: "Following Id can not be empty!" })
  @IsString({ message: "Following Id type must be a string!" })
  @IsMongoId({ message: "Following Id is not valid!" })
  following: Types.ObjectId;
}

export default CreateFollowDto;
