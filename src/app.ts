import express, { Application, Request, Response } from "express";
import cors from "cors";
import { handleGlobalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { rootRoute } from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRoute);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running 🌐",
  });
});

app.use(handleGlobalErrorHandler);
app.use(notFound);

export default app;
