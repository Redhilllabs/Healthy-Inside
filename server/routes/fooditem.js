import express from "express";

import {addFood ,getAllFoods } from "../controllers/fooditems.js";

const router = express.Router();
//create a Food
router.post('/add', addFood)
router.get('/getallfood', getAllFoods)


export default router;