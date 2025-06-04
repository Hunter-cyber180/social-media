import { IsNotEmpty, IsString } from "class-validator";

class CreateCommentDto {
    // user ID validation
    @IsNotEmpty({ message: "User Id can not be empty!" })
    @IsString({ message: "User Id type must be a string!" })
    user: string;
}

export default CreateCommentDto;
