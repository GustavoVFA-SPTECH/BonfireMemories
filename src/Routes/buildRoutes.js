const {Router} = require("express");


const buildController = require("../Controllers/buildController.js");
const buildModel = require("../Models/buildModel.js");

const buildRouter = Router();

buildRouter.post("/saveBuild", buildController.createBuild);
buildRouter.get('/builds/:buildId', buildController.getBuild);
// buildRouter.get("/load", buildController);

module.exports = buildRouter;