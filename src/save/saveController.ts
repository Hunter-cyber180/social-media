import { NextFunction, Router, Request, Response } from "express";
import { save, unsave } from "./saveServices";

const router = Router();

// save controller
router.post(
  "/:userID/:postID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get userID and postID from req.params and save post
      const { userID, postID } = req.params;
      await save(userID, postID);

      // return json response
      res.status(201).json({
        message: "Save Created Successfully!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

// unsave controller
router.post(
  "/:userID/:postID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get userID and postID from req.params and unsave post
      const { userID, postID } = req.params;
      await unsave(userID, postID);

      // return json response
      res.status(200).json({
        message: "Save Deleted Successfully!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
