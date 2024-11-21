import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import connectDB from "./libs/db";

connectDB();

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
