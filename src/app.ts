import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// ? ----- Controllers -----
import authController from "./auth/authController";
import postController from "./posts/postController";
import likeController from "./likes/likeController";
import saveController from "./save/saveController";
import commentController from "./comments/commentController";

import IError from "./errors/errorInterface";

const app = express();

// * ----- Middlewares -----
// ? Cors Policy
app.use(cors());

//? BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

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
