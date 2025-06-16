import { Router, Request, Response, NextFunction } from "express";

// * ----- services -----
import { getUserPage } from "./pageServices";

const router = Router();

// get user page controller
router.get(
  "/:userID/:pageID",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get userID and pageID from req.params and get user page data
      const { userID, pageID } = req.params;
      const data = getUserPage(userID, pageID);

      // return json response
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
