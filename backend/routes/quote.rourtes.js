const express = require("express");
const {getQuotes, addNewQuote } = require("../controllers/quote.controller");
const quoteRoute = express.Router();
const cron = require('node-cron')
const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

quoteRoute.post("/create",authentication,authorization(["admin"]), addNewQuote);
quoteRoute.get("/randomquotes",authentication,getQuotes)


module.exports = quoteRoute;
