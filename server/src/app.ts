import express from "express";
import cors from "cors";
export const app = express();
import routesInit from "./routes/index";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const whitelistedOrigins = [
  "https://chug-beer.netlify.app/",
  "https://chug-beer.netlify.app",
  "http://localhost:5173",
  "https://chug-beer.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelistedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

routesInit(app);
