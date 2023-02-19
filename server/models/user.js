import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    profileLink: {
      type: String,
      // unique: true,
    },
    basePrice: {
      type: Number,
      default: 0,
    },
    sellingPrice: {
      type: Number,
      default: 0,
    },
    contact: {
      type: String,
      // required: true,
      unique: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    team:{
      type: String,
      unique: true,
    },
    dob: {
        type: Date,
        // required: true
      },
      cart: [
        {
          productID: {type: Schema.Types.ObjectId, ref:'Food'},
          quantity: {type: Number, required: true, default: 1}
        }
      ],
      address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        zip: String
      }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);