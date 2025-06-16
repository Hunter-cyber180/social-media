import { Router, Request, Response, NextFunction } from "express";

// * ----- Services -----
import { profile } from "./userServices";

const router = Router();

// update user profile controller
router.put(
  "/:userID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get userID from req.params and update user profile
    const { userID } = req.params;
    await profile(userID, req.file);

    // return json response
    res.status(200).json({
      message: "Profile Updated Successfully!",
      success: true,
    });
  }
);

export default router;
