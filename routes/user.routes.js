const express = require("express");
const userRoute = express.Router();
const { signup, login } = require("../controllers/user.controller");

userRoute.post("/signup", signup);
userRoute.post("/login", login);

module.exports = userRoute;
