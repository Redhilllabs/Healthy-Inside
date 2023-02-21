import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    foodID: {
      type: String,
      unique: true,
      required: true, // add validation for required fields
    },
    foodName: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    foodUrl: {
      data: Buffer,
      contentType: String,
      // required: true,
    },
    foodPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Foods = mongoose.model("Foods", FoodSchema);

export default Foods;
