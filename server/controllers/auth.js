
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
    console.log(req.body)
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(userName,password)
console.log(url)
// console.log(await Users.find())

    const filter = {
      "contact": password,
      "email": userName
    };
    console.log("here")
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("here2")
    const coll = client.db(dbName).collection("users");
    console.log(coll)

    console.log("here3")
    const cursor = coll.find(filter);
    console.log(cursor)
    console.log("here4")
    const result = await cursor.toArray();
  
    console.log("here5")
    console.log( result);
    await client.close();

    if (result.length > 0) {
      return res.json({status:'ok',user:result})
    } else {
      return res.json({status:'error',user:null})
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