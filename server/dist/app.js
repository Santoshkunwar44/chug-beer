import express from "express";
export const app = express();
import routesInit from "./routes/index";
app.use(express.json());
routesInit(app);
//# sourceMappingURL=app.js.map