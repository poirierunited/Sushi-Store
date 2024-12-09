const express = require("express");
const protect = require("../middleware/Auth");
const AsyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const tableproductRoute = express.Router();

tableproductRoute.put(
  "/editProduct/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;

    // If the user is not an admin, log the attempt and return a 403 status
    if (!isAdmin) {
      console.log(
        "User is not an admin" + isAdmin + " USERID: " + req.user._id
      );
      res.status(403).json({ message: "Not authorized as an admin" });
      return;
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      const updatedFields = {};

      if (req.body.name && req.body.name !== product.name) {
        product.name = req.body.name;
        updatedFields.name = req.body.name;
      }
      if (
        req.body.description &&
        req.body.description !== product.description
      ) {
        product.description = req.body.description;
        updatedFields.description = req.body.description;
      }
      if (req.body.price && req.body.price !== product.price) {
        product.price = req.body.price;
        updatedFields.price = req.body.price;
      }
      if (
        req.body.hasOwnProperty("countInStock") &&
        req.body.countInStock !== product.countInStock
      ) {
        product.countInStock = req.body.countInStock;
        updatedFields.countInStock = req.body.countInStock;
      }

      await product.save();

      res.json({
        message: "Producto actualizado con éxito",
        updatedFields,
      });
    } else {
      // Respond with an error if the user is not found
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  })
);

tableproductRoute.post(
  "/addProduct",
  protect,
  AsyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;

    // If the user is not an admin, log the attempt and return a 403 status
    if (!isAdmin) {
      console.log(
        "User is not an admin" + isAdmin + " USERID: " + req.user._id
      );
      res.status(403).json({ message: "Not authorized as an admin" });
      return;
    }

    const {
      name,
      image,
      description,
      rating,
      reviews,
      numReview,
      price,
      countInStock,
    } = req.body;

    const productExists = await Product.findOne({ name });
    if (productExists) {
      res.status(400).json({ message: "Product already registered" });
      return;
    } else {
      const product = await Product.create({
        name: name,
        image: image,
        description: description,
        rating: rating,
        reviews: reviews,
        numReview: numReview,
        price: price,
        countInStock: countInStock,
      });

      if (product) {
        res.status(201).json({
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          countInStock: product.countInStock,
        });
      } else {
        res.status(400).json({ message: "Invalid product data" });
      }
    }
  })
);

tableproductRoute.delete(
  "/deleteProduct/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;

    // If the user is not an admin, log the attempt and return a 403 status
    if (!isAdmin) {
      console.log(
        "User is not an admin" + isAdmin + " USERID: " + req.user._id
      );
      res.status(403).json({ message: "Not authorized as an admin" });
      return;
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne(); // Elimina el producto
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

module.exports = tableproductRoute;
