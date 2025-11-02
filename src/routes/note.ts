// import express  from "express";
// import { validate } from "../middleware/validateZod";
// import { noteSchema } from "../schemas/noteSchema";
// import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/note";
// import { protect } from "../middleware/auth";
// import { authorize } from "../middleware/authorize";


// const router=express.Router();

// router.post("/note",protect,validate(noteSchema),createNote);



// router.put("/note/:id",protect,validate(noteSchema),updateNote);

// router.delete("/note/:id",protect,deleteNote);
// router.get("/note/:id", protect, getNoteById);

// // admin routes can be added here in future
// router.get("/notes", protect, authorize("admin"), getAllNotes);


// export default router;

import express from "express";
import { validate } from "../middleware/validateZod";
import { noteSchema } from "../schemas/noteSchema";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/note";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management (CRUD) for users and admin
 */

/**
 * @swagger
 * /note:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first note"
 *               content:
 *                 type: string
 *                 example: "This is a note about learning TypeScript."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["typescript", "backend"]
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post("/note", protect, validate(noteSchema), createNote);

/**
 * @swagger
 * /note/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated note title"
 *               content:
 *                 type: string
 *                 example: "Updated note content"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["updated", "typescript"]
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
router.put("/note/:id", protect, validate(noteSchema), updateNote);

/**
 * @swagger
 * /note/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/note/:id", protect, deleteNote);

/**
 * @swagger
 * /note/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
router.get("/note/:id", protect, getNoteById);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes (Admin only)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all notes (admin only)
 *       403:
 *         description: Forbidden - user not an admin
 *       401:
 *         description: Unauthorized
 */
router.get("/notes", protect, authorize("admin"), getAllNotes);

export default router;
