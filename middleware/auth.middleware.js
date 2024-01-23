const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    var decoded = jwt.verify(token, "shhhhh");
    req.body.email = decoded.email;
    next();
  } catch (error) {
    res.send("Please login again");
  }
};

const authorization = (permittedrole) => {
  return async (req, res, next) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (permittedrole.includes(user.role)) {
      next();
    } else {
      res.send("you are not authorized");
    }
  };
};

module.exports ={authentication,authorization}
