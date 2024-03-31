const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enem: ["user"],
    default: "user",
  },
  isAdmin:{
    type: Boolean,
    required: true,
    default: false,
  }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
