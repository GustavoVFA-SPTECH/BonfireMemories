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

const getBuild = async (req, res, next) => {
  const { buildId } = req.params;

  try {
    const build = await buildModel.load(buildId);

    if (!build) {
      const error = new Error('Build não encontrada');
      error.status = 404;  
      throw error;
    }
    
    res.json(build);

  } catch (error) {    
    return next(error);
  }
};

module.exports = {
  createBuild,
  getBuild
}