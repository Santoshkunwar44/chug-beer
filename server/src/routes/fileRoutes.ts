import { Router, Request, Response } from "express";
import cloudinary from "../libs/cloudinary";
const multer = require("multer");

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("data"),
  async (req: Request, res: Response) => {
    try {
      // Use (req as any) to bypass TypeScript errors
      const file = (req as any).file; // TypeScript error workaround
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const fileType = (req as any).body.fileType; // Use (req as any) to access body fields

      // Prepare upload options based on file type
      const uploadOptions: any = {
        upload_preset: fileType === "video" ? "vidoes" : "sharefile", // Ensure correct preset is used
        resource_type: fileType === "video" ? "video" : "auto", // "auto" for images and other file types
        public_id: file.originalname.split(".")[0], // Optionally set a custom public ID
        format: fileType === "video" ? "mp4" : undefined, // Ensure the correct format for videos
      };

      console.log("Upload options:", uploadOptions);
      console.log("File buffer size:", file.buffer.length);

      // Upload directly from the buffer using Cloudinary's upload_stream method
      cloudinary.uploader
        .upload_stream(uploadOptions, (error: any, result: any) => {
          if (error) {
            res
              .status(500)
              .json({ error: "Cloudinary upload failed", details: error });
            return;
          }

          // Send the URL of the uploaded file in the response
          res.json({ message: result?.secure_url });
        })
        .end(file.buffer); // Pipe the file buffer to Cloudinary
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

export default router;
