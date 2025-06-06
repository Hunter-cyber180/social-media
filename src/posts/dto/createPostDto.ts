import { IsNotEmpty, IsString } from "class-validator";

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
