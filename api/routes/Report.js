const express = require("express");
const protect = require("../middleware/Auth");
// const admin = require("../middleware/Admin");
const AsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const reportRoute = express.Router();

// Get sales report
reportRoute.get(
  "/sales",
  protect,
  AsyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      console.log(
        "User is not an admin" + isAdmin + " USERID: " + req.user._id
      );
      res.status(403).json({ message: "Not authorized as an admin" });
      return;
    }

    const match = {};
    if (startDate && endDate) {
      match.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

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

    if (salesReport.length > 0) {
      res.status(200).json(salesReport[0]);
    } else {
      res.status(404).json({ message: "No sales data found" });
    }
  })
);

module.exports = reportRoute;
