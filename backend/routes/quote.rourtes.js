const express = require("express");
const { createQuotes, getQuotes } = require("../controllers/quote.controller");
const quoteRoute = express.Router();
const cron = require('node-cron')
const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

quoteRoute.post("/create",authentication,authorization(["admin"]), createQuotes);
quoteRoute.get("/randomquotes",authentication,getQuotes)


module.exports = quoteRoute;
