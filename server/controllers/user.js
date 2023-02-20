import Users from "../models/user.js";
import mongoose from "mongoose";

export const saveUserAddress = async (req, res, next) => {
  const userId = req.params.user_id;
  const addressData = req.body;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.address = addressData;
    await user.save();
    console.log(userId, addressData);
    res.status(200).send("Address saved!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
