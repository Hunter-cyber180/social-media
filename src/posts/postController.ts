import { NextFunction, Router, Request, Response } from "express";
import ValidationMiddleware from "../middlewares/validate";
import CreatePostDto from "./dto/createPostDto";
import Post from "./dto/postDto";
import { addPost } from "./postServices";

const router = Router();

// add post controller
router.post(
  "/",
  ValidationMiddleware(CreatePostDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get data from body and create post
    const body: Post = req.body;
    const post = await addPost(body);

    // return json response
    res.status(201).json({
      message: "Post Created Successfully!",
      data: post,
      success: true,
    });
  }
);
