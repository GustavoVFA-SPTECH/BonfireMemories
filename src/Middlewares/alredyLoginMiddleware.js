const crypto = require("crypto-js");
const { appError } = require("./error");

const alreadyLoginMiddleware = async (req, res, next) => {
  try {
    if (!req.header.token) {
      return next();
    }
    const decryptedToken = CryptoJS.AES.decrypt(encrypted);
    console.log(decryptedToken);
    req.User = decryptedToken;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = alreadyLoginMiddleware;
