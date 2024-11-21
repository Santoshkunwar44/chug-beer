import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // This adds the `file` property to the `Request` type
      body: {
        fileType?: string; // This ensures that `fileType` can be a string (based on your request body)
      };
    }
  }
}
