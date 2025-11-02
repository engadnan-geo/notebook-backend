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
        let notes;
        if(req.user.role === "admin"){
            notes=await NoteModel.find().populate("createdBy","name email role");
        }else{
            notes=await NoteModel.find({createdBy:req.user._id}).sort({createdAt:-1});
        }
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching all notes:", error);
        next(error);
        
    }
}



// update note controller

export const updateNote=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const note=await NoteModel.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},req.body,{new:true});

        if(!note){
            res.status(404).json({message:"Note not found"});
            return;
        }
       res.status(200).json({
  message: "Note updated successfully",
  note,
});

    } catch (error) {
        console.error("Error updating note:", error);
  next(error);
        
    }
}


// delete note controller

export const deleteNote=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{
    try {
       const note=await NoteModel.findOneAndDelete({_id:req.params.id,createdBy:req.user._id});
         if(!note){ 
        res.status(404).json({message:"Note not found"});
        return;

         }
            res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        
        console.error("Error deleting note:", error);
    next(error);
        
    }
}


// get note by id 

export const getNoteById=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{

    try {
        const note=await NoteModel.findOne({_id:req.params.id,createdBy:req.user._id});
        if(!note){
            res.status(404).json({message:"Note not found"});
            return;
        }
        res.status(200).json(note);
        
    } catch (error) {
        console.error("Error fetching note by ID:", error);
    next(error);
        
    }
}