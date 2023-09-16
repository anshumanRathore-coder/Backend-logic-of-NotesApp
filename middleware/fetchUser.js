import express from "express";
import jwt from "jsonwebtoken";
const fetchUser = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({ error: "Please first verify" });
    }
    const verify = jwt.verify(token, process.env.SECREAT_KEY);
    req.body.id = verify.userId;
    // console.log(verify.userId)
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Some error occured" });
  }
};
export default fetchUser;
