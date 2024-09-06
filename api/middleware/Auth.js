const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const dotenv = require("dotenv").config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // seteo de objeto user en request
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch {
      console.log(err);
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized" });
  }
});

module.exports = protect;
