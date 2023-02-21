import Foods from "../models/fooditems.js";
// import multer from "multer";

 
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

export async function addFood(req, res, next) {

  try {
    const food = new Foods({ ...req.body});
    await food.save();
    console.log("Food added successfully");
    res.status(200).send("Food has been created!");
  } catch (error) {
    console.error("Error adding food: ", error);
  }
}

export async function getAllFoods(req, res, next) {
  try {
    const foods = await Foods.find();
    res.status(200).json(foods);
  } catch (error) {
    console.log("came in backend error")
    console.error("Error getting all foods: ", error);
    res.status(500).send("Internal server error");
  }
}
