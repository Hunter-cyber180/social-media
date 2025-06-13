import { Router, Request, Response, NextFunction } from "express";

// * ----- Middlewares -----
import ValidationMiddleware from "../middlewares/validate";

// * ----- Services -----
import { create } from "./replyCommentServices";

// * ----- DTO -----
import ReplyComment from "./dto/replyCommentDto";
import CreateReplyCommentDto from "./dto/createReplyCommentDto";


const router = Router();

router.post(
  "/",
  ValidationMiddleware(CreateReplyCommentDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: ReplyComment = req.body;
      const comment = await create(body);

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
