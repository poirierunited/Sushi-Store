const express = require("express");
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");
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
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
  })
);

userRoute.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Email already registered" });
      return;
    } else {
      const user = await User.create({
        name: name,
        email: email,
        password: password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400).json({ message: "Invalid User Data" });
      }
    }
  })
);

//profile data
userRoute.get(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

//update
userRoute.put(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  })
);

module.exports = userRoute;
