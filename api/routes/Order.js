const express = require("express");
const protect = require("../middleware/Auth");
const AsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const orderRoute = express.Router();

orderRoute.post(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;

    if (orderItems && orderItems.length == 0) {
      res.status(400).json({ message: "Order is empty" });
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id,
      });

      const createdOrder = await order.save();

      res.status(201).json({ createdOrder });
    }
  })
);

module.exports = orderRoute;
