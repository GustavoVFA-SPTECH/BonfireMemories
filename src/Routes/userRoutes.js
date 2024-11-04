const {Router} = require("express");

const userController = require("../Controllers/userController.js")
const authController = require("../Controllers/authController.js")

const userRouter = Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", authController.login);
userRouter.delete("/deleteUser")


module.exports = userRouter;