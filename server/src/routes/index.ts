// Use the routes
import authRoutes from "./authRoutes";
import commentRoutes from "./comment.router";
import entryRoutes from "./entry.router";
import fileRoutes from "./fileRoutes";
import { Application } from "express";

export default (app: Application) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/comment", commentRoutes);
  app.use("/api/entry", entryRoutes);
  app.use("/api/file", fileRoutes);
};
