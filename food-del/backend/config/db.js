import mongoose from "mongoose";
 export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://pallavi:hari@cluster0.p0ob9ga.mongodb.net/food-del').then(()=>console.log("DB connected"));
}