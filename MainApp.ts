import express, { Application } from "express";
import cors from "cors";
import userRouter from "./Router/UserRouter"
import CategoryRouter from "./Router/CategoryRouter"
import ProductRouter from "./Router/ProductRouter"


export const MainApp = (app: Application) => {
  app.use(express.json());
  app.use(cors());

  app.get("/api/v1", (req, res) => {
    res.status(200).json({
      message: "API is running successfully",
    });
  });
  app.use("/api/v1",userRouter)
  app.use("/api/v1", CategoryRouter)
  app.use("/api/v1",ProductRouter)
};