import { NextFunction, Router, Request, Response } from "express";

// * ----- Services -----
import { getAllSaves, save, unsave } from "./saveServices";

const router = Router();

// get all saves controller
router.get(
  "/:userID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get userID from params and get all saves of user
    const { userID } = req.params;
    const data = await getAllSaves(userID);

    // return json response
    res.status(200).json({
      message: "Get All Saves Was Successfully!",
      data,
      success: true,
    });
  }
);

// save controller
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get userID and postID from req.body and save post
      const { userID, postID } = req.body;
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
router.delete(
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
