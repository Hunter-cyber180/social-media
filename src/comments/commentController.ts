import { NextFunction, Router, Request, Response } from "express";

// * ----- Middlewares -----
import ValidationMiddleware from "../middlewares/validate";

// * ----- DTO -----
import CreateCommentDto from "./dto/createCommentDto";
import Comment from "./dto/commentDto";
import { create } from "./commentServices";

const router = Router();

// add comment controller
router.post(
  "/",
  ValidationMiddleware(CreateCommentDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get body from req.body and create new comment
      const body: Comment = req.body;
      const comment = await create(body);

      // return json response
      res.status(201).json({
        message: "Comment Added Successfully!",
        data: comment,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
