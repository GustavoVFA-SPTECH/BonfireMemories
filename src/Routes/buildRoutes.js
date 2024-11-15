const {Router} = require("express");

const buildController = require("../Controllers/buildController")

const buildRouter = Router();

buildRouter.post("/save", buildController)
buildRouter.get("/load", buildController)