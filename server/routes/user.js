import express from "express";
import { saveUserAddress } from "../controllers/user.js";

const router = express.Router();

//SAVE USER ADDRESS
router.post("/:user_id/address", saveUserAddress)


export default router;