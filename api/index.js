const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const products = require("./data/Product");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB;

// connect to mongo db
// alepoirier16
// cEKW2K3W4wWNdj2c
// 186.106.132.181
mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log("Connected to Mongo successfuly");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());

// mongo db seeder routes
app.use("/api/seed", databaseSeeder);

// user routes
app.use("/api/users", userRoute);

// products route
app.use("/api/products", productRoute);

// order route
app.use("/api/orders", orderRoute);

app.listen(PORT || 9000, () => {
  console.log(`App listening in port: ${PORT}`);
});
