import foodModel from "../models/foodModel.js";
import path from 'path';
import fs from 'fs';

// Add food items
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//remove food
const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);
        if (food) {
            const filePath = path.join('uploads', food.image);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting the image file:', err);
                }
            });
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Food Removed" });
        } else {
            res.json({ success: false, message: "Food not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { addFood,listFood ,removeFood};
