import express from "express";
import { protect } from "../middleware/auth";
import { uploadImage } from "../controllers/upload";
import { upload } from "../middleware/upload";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Endpoints for uploading images to Cloudinary
 */

/**
 * @swagger
 * /api/profile-picture:
 *   post:
 *     summary: Upload a user profile picture
 *     description: Uploads an image to Cloudinary and returns the secure URL. Requires JWT authentication.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/demo/image/upload/v1730221123/notebackend/profile.png
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized - missing or invalid JWT
 */
router.post("/profile-picture", protect, upload.single("file"), uploadImage);

export default router;
