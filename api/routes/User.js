const express = require("express");
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");
const userRoute = express.Router();

// User login route
userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    const user = await User.findOne({ email }); // Find user by email

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Respond with user data and a token if authentication is successful
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      // Respond with an error if authentication fails
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
  })
);

// User registration route
userRoute.post(
  "/",
  AsyncHandler(async (req, res) => {
    const {
      run,
      name,
      lastname,
      region,
      city,
      address,
      birthday,
      gender,
      phoneNumber,
      email,
      password,
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Email already registered" });
      return;
    } else {
      // Create new user
      const user = await User.create({
        run: run,
        name: name,
        lastname: lastname,
        region: region,
        city: city,
        address: address,
        birthday: birthday,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      });

      // Check if user was created successfully
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

// Retrieve user profile data
userRoute.get(
  "/profile",
  protect, // Middleware to protect the route
  AsyncHandler(async (req, res) => {
    console.log(req.user); // Log the user data from the request
    const user = await User.findById(req.user._id); // Find the user by ID

    if (user) {
      // Respond with user data if found
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      // Respond with an error if the user is not found
      res.status(404).json({ message: "User not found" });
    }
  })
);

userRoute.get(
  "/get-user/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json({
        // _id: user.id,
        run: user.run,
        name: user.name,
        lastname: user.lastname,
        region: user.region,
        city: user.city,
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

//update user by admin
userRoute.put(
  "/profile/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      const updatedFields = {};
      if (req.body.run && req.body.run !== user.run) {
        user.run = req.body.run;
        updatedFields.run = req.body.run;
      }
      if (req.body.name && req.body.name !== user.name) {
        user.name = req.body.name;
        updatedFields.name = req.body.name;
      }
      if (req.body.lastname && req.body.lastname !== user.lastname) {
        user.lastname = req.body.lastname;
        updatedFields.lastname = req.body.lastname;
      }
      if (req.body.region && req.body.region !== user.region) {
        user.region = req.body.region;
        updatedFields.region = req.body.region;
      }
      if (req.body.city && req.body.city !== user.city) {
        user.city = req.body.city;
        updatedFields.city = req.body.city;
      }
      if (req.body.address && req.body.address !== user.address) {
        user.address = req.body.address;
        updatedFields.address = req.body.address;
      }
      if (req.body.phoneNumber && req.body.phoneNumber !== user.phoneNumber) {
        user.phoneNumber = req.body.phoneNumber;
        updatedFields.phoneNumber = req.body.phoneNumber;
      }
      if (req.body.email && req.body.email !== user.email) {
        user.email = req.body.email;
        updatedFields.email = req.body.email;
      }
      if (req.body.isAdmin !== undefined && req.body.isAdmin !== user.isAdmin) {
        user.isAdmin = req.body.isAdmin;
        updatedFields.isAdmin = req.body.isAdmin;
      }
      if (req.body.password) {
        user.password = req.body.password;
        updatedFields.password = "Updated";
      }

      await user.save();

      res.json({
        message: "Usuario actualizado con éxito",
        updatedFields,
      });
    } else {
      // Respond with an error if the user is not found
      res.status(404).json({ message: "User not found" });
    }
  })
);

module.exports = userRoute;
