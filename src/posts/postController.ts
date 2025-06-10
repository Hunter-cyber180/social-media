import { NextFunction, Router, Request, Response } from "express";

// * ----- DTO -----
import Post from "./dto/postDto";
import CreatePostDto from "./dto/createPostDto";

// * ----- middlewares -----
import ValidationMiddleware from "../middlewares/validate";

// * ----- services -----
import { addPost, deletePost } from "./postServices";

const router = Router();

// add post controller
router.post(
  "/",
  ValidationMiddleware(CreatePostDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from body and create post
      const body: Post = req.body;
      const post = await addPost(body);

      // return json response
      res.status(201).json({
        message: "Post Created Successfully!",
        data: post,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// delete post controller
router.delete(
  "/:userID/:postId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get userID and postID from params and delete post
      const { userID, postID } = req.params;
      await deletePost(userID, postID);

      // return json response
      res.status(200).json({
        message: "Post Deleted Successfully!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
