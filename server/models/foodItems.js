import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    foodID: {
      type: String,
      unique: true,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    foodType: {

      type: String,
      required: true,
    },
    foodDescription: {
      type: String,
      required: true,
    },
    foodUrl: {
      type: String,
      required: true,
    },
    foodPrice: {
      type: Number,
      default: 0,
    },
    foodQuantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Food", FoodSchema);