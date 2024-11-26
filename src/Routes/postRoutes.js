const {Router} = require("express");

const postController = require("../Controllers/postController");

const postRouter = Router();

postRouter.post("/createPost", postController.createPost);
postRouter.get('/feed', postController.getAllPosts);
postRouter.get('/post/:idPost', postController.getPostById);

module.exports = postRouter;