import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

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
}

export default CreatePostDto;
