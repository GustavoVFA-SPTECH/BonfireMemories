const {router} = require("express");

const userController = require("../Controllers/userController.js")

const userRouter = router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
