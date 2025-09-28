import cors from "cors";
import express, { Application, Request, Response } from "express";
import { urls } from "./app/config/url.config";

const app: Application = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: urls.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "SkillForge server is on: 😎",
  });
});

export default app;
