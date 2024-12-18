const {Router} = require("express");

const buildController = require("../Controllers/buildController.js");

const buildRouter = Router();

buildRouter.post("/saveBuild", buildController.createBuild);
buildRouter.get('/builds/:buildId', buildController.getBuild);
buildRouter.get("/load", buildController.getUserBuilds);
buildRouter.get('/buildName/:buildId', buildController.getBuildByID);

module.exports = buildRouter;