import express  from "express";
import { validate } from "../middleware/validateZod";
import { noteSchema } from "../schemas/noteSchema";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/note";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/authorize";


const router=express.Router();

router.post("/note",protect,validate(noteSchema),createNote);



router.put("/note/:id",protect,validate(noteSchema),updateNote);

router.delete("/note/:id",protect,deleteNote);
router.get("/note/:id", protect, getNoteById);

// admin routes can be added here in future
router.get("/notes", protect, authorize("admin"), getAllNotes);


export default router;