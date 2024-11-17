const buildModel = require("../Models/buildModel.js");

const createBuild = async (req, res, next) => {
  const body = req.body;

  try {
    const build = await buildModel.saveBuild(
      body.stats,
      body.build,
      body.equipment
    );
    res.json(build)
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBuild,
}