const {Router} = require("express");

const dashController = require("../Controllers/dashController.js")

const dashRouter = Router();

dashRouter.get("/KPI", dashController);
dashRouter.get("/Weapons", dashController);
dashRouter.get("/Classes", dashController);

module.exports = dashRouter;