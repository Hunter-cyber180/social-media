import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

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

// * ----- 404 page -----
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "page not found!",
    success: false,
  });
});

export default app;
