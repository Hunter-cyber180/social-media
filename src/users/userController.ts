import { Router, Request, Response, NextFunction } from "express";
import { profile } from "./userServices";

const router = Router();

router.put(
  "/:userID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userID } = req.params;
    await profile(userID, req.file);

    res.status(200).json({
      message: "Profile Updated Successfully!",
      success: true,
    });
  }
);

export default router;
