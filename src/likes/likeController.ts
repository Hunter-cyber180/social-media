import { NextFunction, Router, Request, Response } from "express";
import { like, unlike } from "./likeServices";

const router = Router();

// like post controller
router.post(
  "/:userID/:postID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get postID and userID from req.params and like post
    const { postID, userID } = req.params;
    await like(userID, postID);

    // return json response
    res.status(200).json({
      message: "Post Liked Successfully!",
      success: true,
    });
  }
);

// unlike post controller
router.post(
  "/:userID/:postID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get postID and userID from req.params and like post
    const { postID, userID } = req.params;
    await unlike(userID, postID);

    // return json response
    res.status(200).json({
      message: "Post Unliked Successfully!",
      success: true,
    });
  }
);

export default router;
