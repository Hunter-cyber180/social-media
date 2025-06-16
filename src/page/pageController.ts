import { Router, Request, Response, NextFunction } from "express";
import { getUserPage } from "./pageServices";

const router = Router();

router.get(
  "/:userID/:pageID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userID, pageID } = req.params;
      const data = getUserPage(userID, pageID);

      res.status(200).json({
        message: "Get User Page Was Successfully!",
        data,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
