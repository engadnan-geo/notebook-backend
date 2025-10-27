import mongoose from "mongoose";

import { Schema, } from "mongoose";


const noteSchema=new Schema({
title:{type:String, required:true,trim:true},
content:{type:String, required:true,trim:true},
tags:{type:[String], default:[]},


},
{timestamps:true}
);

export const NoteModel=mongoose.model("Note", noteSchema);
