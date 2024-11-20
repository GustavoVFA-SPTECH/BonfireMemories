const database = require("../Database/config");

async function saveBuild(stats, build, equipment) {
  const statsResult = await database.executar(
    `INSERT INTO Stats (level, vigor, attunement, endurence, vitality, strength, dexterity, inteligence, faith, luck) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      stats.level,
      stats.vigor,
      stats.attunement,
      stats.endurence,
      stats.vitality,
      stats.strength,
      stats.dexterity,
      stats.inteligence,
      stats.faith,
      stats.luck
    ]
  );

  const fkStats = statsResult.insertId;

  const buildResult = await database.executar(
    `INSERT INTO Build (name, class, buildOwner, fkStats) 
        VALUES (?, ?, ?, ?);`,
    [build.name, build.class, build.buildOwner, fkStats]
  );

  const fkBuild = buildResult.insertId;

  for (const equip of equipment) {
    await database.executar(
      `INSERT INTO Equipament (name, type, fkBuild) 
            VALUES (?, ?, ?);`,
      [equip.name, equip.type, fkBuild]
    );
  }
}

async function load(buildID) {
  // Recuperar os dados da Build
  const [build] = await database.executar(
    `SELECT idBuild, name, class, buildOwner, fkStats FROM Build WHERE idBuild = ?;`,
    [buildID]
  );

  if (!build) {
    throw new Error('Build não encontrada');
  }

  // Recuperar os dados de Stats associados à Build
  const [stats] = await database.executar(
    `SELECT level, vigor, attunement, endurence, vitality, strength, dexterity, inteligence, faith, luck 
     FROM Stats WHERE idStats = ?;`,
    [build.fkStats]
  );

  if (!stats) {
    throw new Error('Stats não encontrados');
  }

  // Recuperar os equipamentos associados à Build
  const equipment = await database.executar(
    `SELECT name, type FROM Equipament WHERE fkBuild = ?;`,
    [build.idBuild]
  );

  // Garantir que equipment seja uma lista, mesmo que tenha apenas um item
  const equipmentList = Array.isArray(equipment) ? equipment : [equipment];

  // Retornar os dados no formato esperado
  return {
    stats: {
      level: stats.level,
      vigor: stats.vigor,
      attunement: stats.attunement,
      endurence: stats.endurence,
      vitality: stats.vitality,
      strength: stats.strength,
      dexterity: stats.dexterity,
      inteligence: stats.inteligence,
      faith: stats.faith,
      luck: stats.luck
    },
    build: {
      name: build.name,
      class: build.class,
      buildOwner: build.buildOwner
    },
    equipment: equipmentList.map(equip => ({
      name: equip.name,
      type: equip.type
    }))
  };
}


async function getBuildByUserId(userID) {
  try {
    const builds = await database.executar("SELECT idBuild, level, name FROM build JOIN stats ON fkStats = idStats WHERE buildOwner = ?;",
      [userID]
    );
    return builds;
  } catch (error) {
    console.error("Erro ao recuperar builds:", error);
    throw new Error("Não foi possível recuperar as builds");
  }
}

module.exports = {
  saveBuild,
  load,
  getBuildByUserId
};