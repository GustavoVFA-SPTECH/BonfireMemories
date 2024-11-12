const userModel = require("../Models/userModel.js");
const { appError } = require("../Middlewares/error.js");

async function login(req, res, next) {
  const body = req.body;
  try {
    const auth = await userModel.authenticate(body.login, body.password);
    if(!auth){
      throw appError("Incorrect Password or Login", 400);
    }
    res.json(auth);
    console.log(auth)
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

module.exports = {
  login,
  logout,
};