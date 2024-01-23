const express = require("express");
const bcrypt = require("bcrypt");
const Verifier = require("email-verifier");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await UserModel.findOne({ email });

  if (isExist) {
    res.send("email already exists");
    return;
  }

  let verifier = new Verifier("at_nymePwiG6zB5smvYRqHoEnHjV8tBs");
  verifier.verify(email, (err, data) => {
    if (err) {
      res.send("invalid email");
      return;
    } else {
      console.log(data.smtpCheck);
      if (data.smtpCheck === "false") {
        res.send("email not exists");
        return;
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new UserModel({
          name,
          email,
          password: hashedPassword,
        });

        user.save();
        res.send("user created");
      }
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await UserModel.findOne({ email: email });

  if (result) {
    const match = await bcrypt.compare(password, result.password);
    const token = jwt.sign({ email: email }, "shhhhh");
    if (match) {
      res.status(200).json({
        result: "Login successful",
        token: token,
      });
    } else {
      res.send("Invalid email or password");
      return;
    }
  } else {
    res.status(200).json({
      result: "User not Exists",
      token: "",
    });
  }
};

module.exports = { signup, login };
