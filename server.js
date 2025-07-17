// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
const routes = require("./routes/routes.js");
const connectDB = require("./config/mongoInit.js");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json()); // For JSON body parsing

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// routes
app.use(routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
