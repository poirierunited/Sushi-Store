const express = require("express");
const protect = require("../middleware/Auth");
const AsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const orderRoute = express.Router();

// Creates a new order with the provided details.
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

    // Check if order items are provided
    if (orderItems && orderItems.length == 0) {
      res.status(400).json({ message: "Order is empty" });
    } else {
      // Create a new order instance
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

      // Save the order to the database
      const createdOrder = await order.save();

      // Respond with the created order details
      res.status(201).json({ createdOrder });
    }
  })
);

// Retrieve a specific order by ID
orderRoute.get(
  "/:id",
  protect,
  AsyncHandler(async (req, res) => {
    // Find the order by ID and populate user details
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      // If order is found, respond with order details
      res.status(200).json(order);
    } else {
      // If order is not found, respond with an error message
      res.status(404).json({ message: "Order not found" });
    }
  })
);

// Update order status to paid after successful payment
orderRoute.put(
  "/:id/payment",
  protect,
  AsyncHandler(async (req, res) => {
    // Find the order by ID
    const order = await Order.findById(req.params.id);
    if (order) {
      // Update order payment status and details
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updatedTime: req.body.updatedTime,
        emailAddress: req.body.emailAddress,
      };

      // Save the updated order to the database
      const updatedOrder = await order.save();
      // Respond with the updated order details
      res.status(200).json(updatedOrder);
    } else {
      // If order is not found, respond with an error message
      res.status(404).json({ message: "Order not found" });
    }
  })
);

// Retrieve all orders for the authenticated user
orderRoute.get(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    // Find all orders for the authenticated user and sort them by ID in descending order
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      // If orders are found, respond with the orders
      res.status(200).json(orders);
    } else {
      // If no orders are found, respond with an error message
      res.status(404).json({ message: "Order not found" });
    }
  })
);

module.exports = orderRoute;
