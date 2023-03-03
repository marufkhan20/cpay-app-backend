const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { authRoutes, userRoutes, invoiceRoutes } = require("./routes");
const app = express();

// config dot env
dotenv.config();

// use cors
app.use(cors());

// config data receive
app.use(express.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// set public folder
app.use(express.static("public"));

// app all routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/", (req, res) => {
  res.status(200).json({ message: "Welcome to cpay app rest api." });
});

// database connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log("error", err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
