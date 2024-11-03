const userModel = require("../Models/userModel.js");
const { appError } = require("../Middlewares/error.js");

function login(req, res, next) {
  const body = req.body;
  try {
    const auth = userModel.authenticate(body.login, body.password);
    res.auth;
  } catch (error) {
    return next(error);
  }
}

function logout(req, res, next) {
  try {
  } catch (error) {
    return next(error);
  }
}
