const express = require("express");

// local modules
const connection = require("./config/db");
const UserModel = require("./models/user.model");
const userRoute = require("./routes/user.routes");
const { qouteRoute } = require("./controllers/quote.controller");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey random quotes generator app building is in progress");
});

app.use("/user", userRoute);
app.use('/quote',qouteRoute);

app.listen(8080, async () => {
  await connection;
  console.log("server is running on port 8080");
});
