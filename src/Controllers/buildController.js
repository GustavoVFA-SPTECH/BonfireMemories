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

const getUserBuilds = async (req, res) => {
  try {   
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ error: "O ID do usuário é obrigatório." });
    }
    const builds = await buildModel.getBuildByUserId(userID);
 
    res.status(200).json(builds);
  } catch (error) {
    console.error("Erro ao obter as builds do usuário:", error);
    
    res.status(500).json({ error: "Não foi possível recuperar as builds do usuário." });
  }
};


module.exports = {
  createBuild,
  getBuild,
  getUserBuilds
}