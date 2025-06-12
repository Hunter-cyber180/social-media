import { NextFunction, Router, Request, Response } from "express";
import { follow } from "./followServices";

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

export default router;
