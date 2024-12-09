const express = require("express");
const protect = require("../middleware/Auth");
const AsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const reportRoute = express.Router();

// Retrieve sales report data for a specified date range
reportRoute.get(
  "/sales",
  protect,
  AsyncHandler(async (req, res) => {
    // Extract startDate and endDate from query parameters
    const { startDate, endDate } = req.query;

    // Check if the user is an admin
    const isAdmin = req.user.isAdmin;

    // If the user is not an admin, log the attempt and return a 403 status
    if (!isAdmin) {
      console.log(
        "User is not an admin" + isAdmin + " USERID: " + req.user._id
      );
      res.status(403).json({ message: "Not authorized as an admin" });
      return;
    }

    // Create a match object for the date range filter
    const match = {};
    if (startDate && endDate) {
      match.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Aggregate sales report data
    const salesReport = await Order.aggregate([
      { $match: match },
      {
        $facet: {
          totalSummary: [
            {
              $group: {
                _id: null,
                totalPrice: { $sum: "$totalPrice" },
                totalOrders: { $sum: 1 },
              },
            },
          ],
          allOrders: [
            {
              $match: match,
            },
            {
              $project: {
                "orderItems.name": 1,
                "orderItems.quantity": 1,
                "orderItems.price": 1,
                user: 1,
                totalPrice: 1,
              },
            },
          ],
        },
      },
    ]);

    // If sales report data is found, return it with a 200 status
    if (salesReport.length > 0) {
      res.status(200).json(salesReport[0]);
    } else {
      // If no sales data is found, return a 404 status
      res.status(404).json({ message: "No sales data found" });
    }
  })
);

module.exports = reportRoute;
