const {Router} = require("express");

const userController = require("../Controllers/userController.js");
const authController = require("../Controllers/authController.js");

const userRouter = Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", authController.login);
userRouter.get("/buildCount/:userId", userController.getBuildCountController);
userRouter.get("/postCount/:userId", userController.getPostCountController);
userRouter.get("/user/:idUser", userController.getUserPictureController);
userRouter.put("/updateUser", userController.updateUserData);
userRouter.get("/userPosts/:idUser", userController.userPosts)

// userRouter.delete("/deleteUser");

module.exports = userRouter;