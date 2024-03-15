const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const userService = require("../api/users/users.service");
const User = require("./../api/users/users.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    console.log(decoded)
    const user = await User.findById(decoded.userId );

    if (user) {
      req.user = user;
    } else {
      throw new Error("Utilisateur non trouvé");
    }

    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
