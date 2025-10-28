import { Request, Response,NextFunction } from "express";
import { UserModel } from "../models/user";
import { generateToken } from "../utils/generateToken";

interface userRequestbody{
name:string,
email:string,
password:string,
role?:"user" | "admin"
}

export const register=async(req:Request<{},{},userRequestbody>,res:Response,next:NextFunction):Promise<void>=>{
    let{name,email,password,role}=req.body;
    try {
        email=email.toLowerCase();
        //check if user already exists
        const existingUser=await UserModel.findOne({email});
        if(existingUser) {res.status(400).json({message:"User already exists"});
        return;}
        // create new user
        const newUser=await UserModel.create({name,email,password,role});
        // generate token
        const token=generateToken(newUser._id.toString());
        res.status(201).json({token})

        
    } catch (error) {
        console.error(error,"Error during user registration");
        next(error);
    }


}


// login controller

export const login=async(req:Request<{},{},userRequestbody>,res:Response,next:NextFunction):Promise<void>=>{
    let{email,password}=req.body;
    try {
        email=email.toLowerCase();
        //check if user exists
        const user=await UserModel.findOne({email});
        if(!user || !(await user.comparePassword(password))){
         res.status(401).json({message:"Invalid email or password"});
         return;
        }
        // generate token
        const token=generateToken(user._id.toString());
        res.status(200).json({token});
        
    } catch (error) {
        console.error(error,"Error during user login");
        next(error);
        
    }
}