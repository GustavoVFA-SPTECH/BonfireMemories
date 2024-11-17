const {Router} = require("express");

const buildController = require("../Controllers/buildController.js");

const buildRouter = Router();

buildRouter.post("/saveBuild", buildController.createBuild);
// buildRouter.get("/load", buildController);

module.exports = buildRouter;