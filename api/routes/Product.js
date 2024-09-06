const express = require("express");
const AsyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");
const { default: mongoose } = require("mongoose");
const productRoute = express.Router();

productRoute.get(
  "/",
  AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

productRoute.get(
  "/:id",
  AsyncHandler(async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      }
      const product = await Product.findById(req.params.id);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error fetching product",
        error: error.message,
      });
    }
  })
);

module.exports = productRoute;
