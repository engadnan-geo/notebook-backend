import express  from "express";
import { validate } from "../middleware/validateZod";
import { noteSchema } from "../schemas/noteSchema";
import { createNote } from "../controllers/note";

const router=express.Router();

router.post("/note",validate(noteSchema),createNote);

export default router;