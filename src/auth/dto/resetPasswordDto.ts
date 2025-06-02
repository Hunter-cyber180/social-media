import { IsNotEmpty, IsString, Matches } from "class-validator";

export class ForgetPasswordDto {
  // email validation
  @IsNotEmpty({ message: "Email cannot be empty!" })
  @IsString({ message: "Email type must be a string!" })
  @Matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
    // validate email by regex
    message: "Email is not valid!",
  })
  email: string;
}

export class ResetPasswordDto extends ForgetPasswordDto {
  // reset token validation
  @IsNotEmpty({ message: "token cannot be empty!" })
  @IsString({ message: "token type must be a string!" })
  token: string;
}
