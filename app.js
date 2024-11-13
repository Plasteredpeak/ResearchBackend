const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

const app = express();

const PORT = process.env.PORT || 5000;

//global middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const listRoutes = require("./src/routes/listRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/list", listRoutes);

//add / route
app.get("/", (req, res) => {
  res.send("Welcome to the Server");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err.original);
    });
});

module.exports = { app, server };
