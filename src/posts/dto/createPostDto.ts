import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

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
}

export default CreatePostDto;
