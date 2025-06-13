import { Router, Request, Response, NextFunction } from "express";

// * ----- Middlewares -----
import ValidationMiddleware from "../middlewares/validate";

// * ----- Services -----
import { create } from "./replyCommentServices";

// * ----- DTO -----
import ReplyComment from "./dto/replyCommentDto";
import CreateReplyCommentDto from "./dto/createReplyCommentDto";

const router = Router();

// create reply comment controller
router.post(
  "/",
  ValidationMiddleware(CreateReplyCommentDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get data from req.body and create reply comment
      const body: ReplyComment = req.body;
      const comment = await create(body);

      // return json response
      res.status(201).json({
        message: "Reply Comment Added Successfully!",
        data: comment,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
