
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

interface AuthRequest extends Request {
  user?: any; // Later we’ll type this properly
}


export const protect=async(req:AuthRequest,res: Response, next: NextFunction): Promise<void>=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
         res.status(401).json({message:"No token provided"});
         return;
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string)
        req.user=await UserModel.findById((decoded as any).id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
        
    }

}