const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const userService = require("../api/users/users.service");
const User = require("./../api/users/users.model");


module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    const user = User.findOne({ _id: decoded.userId })
    console.log(user)
    req.user = user;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
