// Use the routes
import authRoutes from "./authRoutes";
import commentRoutes from "./comment.router";
import entryRoutes from "./entry.router";
export default (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api", commentRoutes);
    app.use("/api", entryRoutes);
};
//# sourceMappingURL=index.js.map