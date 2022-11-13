const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// App Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Connection to MongoDB
const connectToMongo = require("./db");
connectToMongo();

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/articles", require("./routes/articles"));

// Heroku Production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}

// Endpoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
