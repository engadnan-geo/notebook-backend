import { Request, Response,NextFunction } from "express";
import { NoteModel } from "../models/note";
export const createNote=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
try {
    const note=await NoteModel.create({...req.body});
    res.status(201).json(note)
} catch (error) {
    next(error);

    
}

}