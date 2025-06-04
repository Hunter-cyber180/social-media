import { IsNotEmpty, IsString } from "class-validator";

class CreateCommentDto {
    // user ID validation
    @IsNotEmpty({ message: "User Id can not be empty!" })
    @IsString({ message: "User Id type must be a string!" })
    user: string;

    // post ID validation
    @IsNotEmpty({ message: "Post Id can not be empty!" })
    @IsString({ message: "Post Id type must be a string!" })
    post: string;

    // content validation
    @IsNotEmpty({ message: "Content can not be empty!" })
    @IsString({ message: "Content type must be a string!" })
    content: string;
}

export default CreateCommentDto;
