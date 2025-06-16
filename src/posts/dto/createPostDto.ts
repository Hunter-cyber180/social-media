import { Type } from "class-transformer";
import "reflect-metadata";
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";

// media DTO
class MediaDto {
  // media.path validation
  @IsNotEmpty({ message: "Path can not be empty!" })
  @IsString({ message: "Path type must be a string!" })
  path: string;

  // media.filename validation
  @IsNotEmpty({ message: "Filename can not be empty!" })
  @IsString({ message: "Filename type must be a string!" })
  filename: string;
}

// create post DTO
class CreatePostDto {
  // media validation
  @ValidateNested()
  @Type(() => MediaDto)
  media: MediaDto;

  // description validation
  @IsNotEmpty({ message: "Description can not be empty!" })
  @IsString({ message: "Description type must be a string!" })
  desc: string;

  // tags validation
  @IsArray({ message: "Tags must be an array!" })
  @IsString({ each: true, message: "Tag type must be a string!" })
  @IsOptional()
  tags?: string[];

  // user ID validation
  @IsNotEmpty({ message: "User Id can not be empty!" })
  @IsString({ message: "User Id type must be a string!" })
  @IsMongoId({ message: "User Id is not valid!" })
  user: Types.ObjectId;
}

export default CreatePostDto;
