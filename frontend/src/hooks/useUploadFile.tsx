import { useState } from "react";
import { env } from "../utils/env";

const useUploadFile = () => {
  const [uploading, setIsUploading] = useState(false);

  /**
   * @param {File} file - The file to upload
   * @param {(error: null | string, url: string) => void} cb - The callback to call when the image is uploaded
   */
  const uploadImage = async (
    file: File,
    cb: (error: null | string, url: string) => void
  ): Promise<void> => {
    if (!file) return;

    const fileType = file?.type.split("/")[0] as "image" | "video" | "audio";
    setIsUploading(true);
    const timeoutDuration = 600000; // 10 minutes in milliseconds
    const controller = new AbortController();

    setTimeout(() => {
      controller.abort();
    }, timeoutDuration);

    const formData = new FormData();
    formData.append("data", file);
    formData.append("fileType", fileType);

    try {
      const res = await fetch(`${env.BACKEND_API_URL}/api/file/upload`, {
        method: "POST",
        signal: controller.signal,
        body: formData, // Use FormData to send the file
      });

      const data = await res.json();
      if (res.status === 200) {
        cb(null, data.message as string); // Return file URL from backend
      }
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      console.error(err);
      cb("Upload failed", "");
    }
  };

  return { uploadImage, isUploading: uploading };
};

export default useUploadFile;
