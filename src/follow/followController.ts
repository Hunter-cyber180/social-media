import { NextFunction, Router, Request, Response } from "express";

// * ----- Services -----
import { follow, unFollow } from "./followServices";

const router = Router();

// follow page controller
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get pageID and userID from req.body and follow page
    const { userID, pageID } = req.body;
    const data = await follow(userID, pageID);

    // return json response
    res.status(201).json({
      message: "Page Followed Successfully!",
      data,
      success: true,
    });
  }
);

// unfollow page controller
router.delete(
  "/:userID/:pageID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get pageID and userID from req.params and unfollow page
    const { userID, pageID } = req.params;
    await unFollow(userID, pageID);

    // return json response
    res.status(200).json({
      message: "Page UnFollowed Successfully!",
      success: true,
    });
  }
);

export default router;
