const express = require("express");
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const userRoute = express.Router();

userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

module.exports = userRoute;
