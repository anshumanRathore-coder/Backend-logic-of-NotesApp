import express from "express";
import UserInfo from "../schema/userSchema.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fetchUser from "../middleware/fetchUser.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// For registering a new user
router.post(
  "/register",
  body("name").isLength({ min: 3, max: 20 }),
  body("email").isEmail(),
  async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      // console.log(err);
      return res.status(400).json({success:"false","error":"Check your credentials"});
    }
    try {
      const { name, email,username,password } = req.body;
      const emailExist =await UserInfo.findOne({email})
      const usernameExist=await UserInfo.findOne({username})
      if(emailExist){
        return res.status(200).json({success:"false","error":"Email is already taken"});
      }
      if(usernameExist){
        return res.status(200).json({success:"false","error":"username is already taken"})
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);
      const newUser = await UserInfo.create({
        name,
        email,
        username,
        password: secPassword,
      });
      const payLoad = {
        userId: newUser.id,
      };
      const token = jwt.sign(payLoad, process.env.SECREAT_KEY);
      // console.log(token);
      res.json({success:"true",token});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:"false","error":"Internal server error"});
    }
  }
);

// Signup an user
router.post(
  "/login",
  body("email").isEmail(),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({success:'false',"error":"Email is invalid"});
    }
    try {
      const { email, password } = req.body;
      const user = await UserInfo.findOne({ email });
      if (!user) {
        res.status(200).json({success:"false","error":"User not exist"});
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res.status(200).json({success:"false","error":"Password is  incorrect"});
      }
      const payLoad = {
        userId: user.id,
      };
      const token = jwt.sign(payLoad, process.env.SECREAT_KEY);

      // console.log(token);
      res.send({success:"true",token});
    } catch (error) {
      console.log(error);
      res.status(500).json({success:"false","error":"Internal server error"});;
    }
  }
);

// getUser data
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.body.id;
    // console.log(userId);
    const user = await UserInfo.findById(userId);
    console.log(user);
    if (!user) {
      res.json({success:"false","error":"Authentication required"});
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({success:"false","error":"Internal server error"});
  }
});
export default router;
