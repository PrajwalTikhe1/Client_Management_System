const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Config env variables
dotenv.config();

// Connection to MongoDB
const connectToMongo = require("./db");
connectToMongo();

// App Middleware
const app = express();

// Required headers
const headers = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Content-type");
  next();
};

// App Cors
app.use(
  cors({
    allowedHeaders: app.use(headers),
  })
);

// Use JSON
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/articles", require("./routes/articles"));

// Server Production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("/frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Endpoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
