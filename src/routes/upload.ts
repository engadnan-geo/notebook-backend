import express from 'express'
import { protect } from '../middleware/auth';
import { uploadImage } from '../controllers/upload';
import { upload } from '../middleware/upload';


const router=express.Router()



router.post("/profile-picture",protect,upload.single("file"),uploadImage);

export default router