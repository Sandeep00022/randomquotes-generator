const express = require("express");
const env = require("dotenv");
const cors = require('cors');

env.config();
// local modules
const connection = require("./config/db");
const userRoute = require("./routes/user.routes");
const quoteRoute = require("./routes/quote.rourtes");

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey random quotes generator app building is in progress");
});

app.use("/user", userRoute);
app.use("/quote", quoteRoute);

const port =process.env.PORT || 8080;
app.listen(port, async() => {
  await connection;
  console.log(`server is running on port ${port}`);
});
