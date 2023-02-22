import Users from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
var url = process.env.MONGO;
const dbName = process.env.dbName;

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const filter = {
      contact: password,
      email: userName,
    };
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const coll = client.db(dbName).collection("users");
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    await client.close();

    if (result.length > 0) {
      return res.json({ status: "ok", user: result });
    } else {
      return res.json({ status: "error", user: null });
    }
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new Users({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
