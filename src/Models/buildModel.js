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
  const [build] = await database.executar(
    `SELECT name FROM Build WHERE idBuild =?;`,
    [buildID]
  );
}

module.exports = {
  saveBuild,
  load
};