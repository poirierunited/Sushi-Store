const express = require("express");
const AsyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");
const { default: mongoose } = require("mongoose");
const productRoute = express.Router();

// Retrieve all products from the database and return them as JSON response
productRoute.get(
  "/",
  AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Retrieve a single product by ID from the database and return it as JSON response
productRoute.get(
  "/:id",
  AsyncHandler(async (req, res) => {
    try {
      // Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      }

      // Find the product by ID
      const product = await Product.findById(req.params.id);

      // If product is found, return it as JSON response
      if (product) {
        res.json(product);
      } else {
        // If product is not found, return a 404 status with a message
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      // If there is an error during the process, return a 500 status with an error message
      res.status(500).json({
        message: "Error fetching product",
        error: error.message,
      });
    }
  })
);

module.exports = productRoute;
