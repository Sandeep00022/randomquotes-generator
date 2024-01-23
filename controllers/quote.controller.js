const express = require("express");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const cron = require("node-cron");
const env = require('dotenv');
 env.config()
// local modules

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");
const QuoteModel = require("../models/quotes.model");
const qouteRoute = express.Router();

qouteRoute.post(
  "/create",
  authentication,
  authorization(["admin"]),
  (req, res) => {
    try {
      const { quote, author } = req.body;
      const newQuote = new QuoteModel({ quote, author });
      newQuote.save();
      res.status(200).json({
        success: true,
        data: newQuote,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

qouteRoute.get("/randomquotes", authentication, async (req, res) => {
  const { email } = req.body;
  
  console.log(process.env.EMAIL)
  const AllQuotes = await QuoteModel.find();

  const randomQuotes = AllQuotes[Math.floor(Math.random() * AllQuotes.length)];
  console.log("random", randomQuotes.quote);
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sandeep Yadav",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      intro: "Hey, Here is your today's quote!",
      table: {
        data: [
          {
            item: "I hope your day will be full of Happiness",
            description: randomQuotes.quote,
            price: "$200",
          },
        ],
      },
      outro: "Looking forward to see you happy",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your today's quote",
    html: mail,
  };

  cron.schedule("25 15 * * *", () => {
    transporter.sendMail(message).then(() => {
      return res
        .status(201)
        .json({
          msg: "you should receive an email",
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    });
  });

  res.send("you will receive mail at 2pm daily");
});

module.exports = { qouteRoute };

// jkzr zych eykf rnmb
