const {Router} = require("express");

const dashController = require("../Controllers/dashController.js")

const dashRouter = Router();

dashRouter.get("/KPI", dashController.createKPIs);
dashRouter.get("/Weapons", dashController.createGraphic1);
dashRouter.get("/Classes", dashController.createGraphic2);
dashRouter.get("/Rings", dashController.createGraphic3);

module.exports = dashRouter;