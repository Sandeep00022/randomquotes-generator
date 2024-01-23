const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const QuoteModel = mongoose.model("quote", quoteSchema);

module.exports = QuoteModel;
