import cloudinary from "../utils/cloudinary";
import { Request, Response, NextFunction } from "express";

// Define the AuthRequest type
interface AuthRequest extends Request {
  user?: any;
  file?: any;
}

// Upload Image Controller
export const uploadImage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // If no file uploaded
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // Cloudinary upload stream
    const stream = cloudinary.uploader.upload_stream(
      { folder: "notebackend" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          next(error);
          return;
        }

        res.status(200).json({
          message: "Image uploaded successfully",
          url: result?.secure_url,
        });
      }
    );

    // End stream (send buffer data)
    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Error in uploadImage:", error);
    next(error);
  }
};
