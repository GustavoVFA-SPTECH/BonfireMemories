const {Router} = require("express");

const postController = require("../Controllers/postController");

const postRouter = Router();

postRouter.post("/createPost", postController.createPost);

module.exports = postRouter;