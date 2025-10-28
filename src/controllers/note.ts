import { Request, Response,NextFunction } from "express";
import { NoteModel } from "../models/note";


// create note controller
interface AuthRequest extends Request {
  user?: any;
}

export const createNote=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void> =>{
try {
    const note=await NoteModel.create({...req.body,createdBy: req.user._id});
    res.status(201).json(note)
} catch (error) {
    next(error);

    
}

}

// get all notes controller

// interface AuthRequest extends Request {
//   user?: any;
// }


export const getAllNotes=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const notes=await NoteModel.find({createdBy:req.user._id}).sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        next(error);
        
    }
}