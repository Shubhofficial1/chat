require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5001;
const MODE = process.env.MODE || "development";

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} in ${MODE} mode`);
});
