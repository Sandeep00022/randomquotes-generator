const express = require("express");
const cron = require("node-cron");

// local modules
const connection = require("./config/db");
const UserModel = require("./models/user.model");
const userRoute = require("./routes/user.routes");
const quoteRoute = require("./routes/quote.rourtes");
const { getQuotes } = require("./controllers/quote.controller");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey random quotes generator app building is in progress");
});

app.use("/user", userRoute);
app.use("/quote", quoteRoute);

app.listen(8080, async () => {
  await connection;
  console.log("server is running on port 8080");
});
