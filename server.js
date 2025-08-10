const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Handle React routing, return index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
