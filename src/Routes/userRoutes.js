const {Router} = require("express");

const userController = require("../Controllers/userController.js");
const authController = require("../Controllers/authController.js");

const userRouter = Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", authController.login);
userRouter.get("/buildCount/:userId", userController.getBuildCountController);
userRouter.get("/postCount/:userId", userController.getPostCountController);
userRouter.get("/user/:idUser/picture", userController.getUserPictureController);

// userRouter.delete("/deleteUser");
// userRouter.put("/updateUser");

module.exports = userRouter;