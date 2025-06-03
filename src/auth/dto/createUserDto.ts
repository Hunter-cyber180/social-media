import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

// create user DTO
export class LoginUserDto {
  // email validation
  @IsNotEmpty({ message: "Email cannot be empty!" })
  @IsString({ message: "Email type must be a string!" })
  @Matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
    // validate email by regex
    message: "Email is not valid!",
  })
  email: string;

  // password validation
  @IsNotEmpty({ message: "Password cannot be empty!" })
  @IsString({ message: "Password type must be a string!" })
  // validate password by regex
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message: "Password is not valid!",
  })
  password: string;
}

export class RegisterUserDto extends LoginUserDto {
  //  username validation
  @IsNotEmpty({ message: "Username cannot be empty!" })
  @IsString({ message: "Username type must be a string!" })
  @MinLength(3, { message: "Username is too short!" })
  @MaxLength(30, { message: "Username is too long!" })
  username: string;
  
  // name validation
  @IsNotEmpty({ message: "Name cannot be empty!" })
  @IsString({ message: "Name type must be a string!" })
  @MinLength(3, { message: "Name is too short!" })
  @MaxLength(50, { message: "Name is too long!" })
  name: string;
}
