const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const products = require("./data/Product");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");
const reportRoute = require("./routes/Report");

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB;

mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log("Connected to Mongo successfuly");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(cors());

// mongo db seeder routes
app.use("/api/seed", databaseSeeder);

// user routes
app.use("/api/users", userRoute);

// products route
app.use("/api/products", productRoute);

// order route
app.use("/api/orders", orderRoute);

// report route
app.use("/api/reports", reportRoute);

// paypal payment api for client key;
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.listen(PORT || 9000, () => {
  console.log(`App listening in port: ${PORT}`);
});
