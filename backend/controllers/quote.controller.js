const express = require("express");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const cron = require("node-cron");
const env = require("dotenv");
env.config();
// local modules

const QuoteModel = require("../models/quotes.model");

const createQuotes = (req, res) => {
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
};

const getQuotes = (req, res) => {
  const { email } = req.body;

  console.log(process.env.EMAIL);

  cron.schedule("59 * * * *", async () => {
    const AllQuotes = await QuoteModel.find();

    const randomQuotes =
      AllQuotes[Math.floor(Math.random() * AllQuotes.length)];
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
        title: "Quote of the Day",
        intro: randomQuotes.quote + "😊",
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

    transporter.sendMail(message);
  });

  res.send("quotes has been sent successfully");
};

module.exports = { createQuotes, getQuotes };
