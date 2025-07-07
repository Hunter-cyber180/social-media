import { NextFunction, Router, Request, Response } from "express";
import { like, unlike } from "./likeServices";

const router = Router();

// like post controller
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get postID and userID from req.body and like post
      const { postID, userID } = req.body;
      await like(userID, postID);

      // return json response
      res.status(200).json({
        message: "Post Liked Successfully!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// unlike post controller
router.delete(
  "/:userID/:postID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get postID and userID from req.params and like post
      const { postID, userID } = req.params;
      await unlike(userID, postID);

      // return json response
      res.status(200).json({
        message: "Post Unliked Successfully!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
