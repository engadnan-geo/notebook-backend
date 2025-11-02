import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import notecreate from "./routes/note";
import authRoutes from "./routes/authRoutes";
import profile from "./routes/upload";
import {limiter} from "./middleware/ratelimiter"
import helmet from "helmet";
dotenv.config()


const app=express();
app.use(limiter);
app.use(express.json());
// 🛡️ Security middlewares
app.use(helmet()); // ← Helmet


//register routes
app.use("/",notecreate)
app.use("/auth", authRoutes);
app.use("/",profile)

app.get("/", (_req:Request, res:Response) => {
  res.send("API is running...");
});

const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI).then(() => {
  console.log("✅MongoDB connected successfully");
}).catch((error:any) => {
  console.error("🚩MongoDB connection error:", error);
});



app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
})