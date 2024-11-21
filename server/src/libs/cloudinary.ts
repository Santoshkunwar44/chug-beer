import { env } from "../config/env";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "onlinecoder",
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
