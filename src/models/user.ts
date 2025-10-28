import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}


const userSchema=new mongoose.Schema<IUser>({
    name:String,
    email:{type:String, unique:true, required:true,trim:true},
    password:{type:String, required:true},
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},
{timestamps:true}
);
//hash password before saving user

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})


//method to compare password
userSchema.methods.comparePassword=function(inputPassword:string){
return bcrypt.compare(inputPassword,this.password);
}

export const UserModel=mongoose.model<IUser>("User",userSchema);


