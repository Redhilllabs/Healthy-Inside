import express from "express";
import {addtocart ,getcart, decreaseCartItem } from "../controllers/cart.js";

const router = express.Router();

//create a cart route 
router.post('/addtocart', addtocart)
router.post('/getcart', getcart)
router.post('/decreaseCartItem',decreaseCartItem)

export default router;