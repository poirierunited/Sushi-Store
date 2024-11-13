const express = require("express");
const protect = require("../middleware/Auth");
const admin = require("../middleware/Admin");
const AsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const reportRoute = express.Router();

// Get sales report
reportRoute.get(
  "/sales",
//   protect,
//   admin,
  AsyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

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
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
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