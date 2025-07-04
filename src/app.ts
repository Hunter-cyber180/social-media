import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

// ? ----- Controllers -----
import authController from "./auth/authController";
import postController from "./posts/postController";
import likeController from "./likes/likeController";
import saveController from "./save/saveController";
import commentController from "./comments/commentController";
import followController from "./follow/followController";
import replyCommentController from "./replyComments/replyCommentController";
import pageController from "./page/pageController";
import userController from "./users/userController";

import IError from "./errors/errorInterface";

// ? swagger router
import swaggerRouter from "./docs/swaggerConfig";

const app = express();

// * ----- Middlewares -----
// ? Cors Policy
app.use(cors());

//? BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

// * ----- Static Folders -----
app.use("/media", express.static(path.join(__dirname, "public/images")));

// * ----- Routes -----
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "main page" });
});

// auth routes
app.use("/auth", authController);
// post routes
app.use("/posts", postController);
// like routes
app.use("/likes", likeController);
// save routes
app.use("/saves", saveController);
// comment routes
app.use("/comments", commentController);
// follow routes
app.use("/follow", followController);
// reply comment routes
app.use("/replyComments", replyCommentController);
// page routes
app.use("/pages", pageController);
// user routes
app.use("/users", userController);

// * ----- Api Docs -----
app.use("/api-docs", swaggerRouter);

// * ----- 404 page -----
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "page not found!",
    success: false,
  });
});

// * ----- Error Handler -----
app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: `Error: ${error.message || "Internal Server Error!"}`,
    },
  });
});

export default app;
