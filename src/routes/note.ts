import express  from "express";
import { validate } from "../middleware/validateZod";
import { noteSchema } from "../schemas/noteSchema";
import { createNote, getAllNotes } from "../controllers/note";
import { protect } from "../middleware/auth";


const router=express.Router();

router.post("/note",protect,validate(noteSchema),createNote);

router.get("/notes",protect, getAllNotes);

export default router;