const database = require("../Database/config.js");


async function get10Weapons(){
    try {
        const Weapons = database.executar("SELECT class, COUNT(class) FROM Build GROUP BY class")
    } catch (error) {
        
    }
}

async function getKPIs(){
    try {
        const MostWeapon = database.executar(`SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'weapon' GROUP BY name ORDER BY qtd DESC LIMIT 1;`);
        const MostRing = database.executar(`SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'ring' GROUP BY name ORDER BY qtd DESC LIMIT 1;`);
        const MostClass = database.executar("SELECT class, COUNT(class) as qtd FROM build GROUP BY class ORDER BY qtd DESC LIMIT 1;")

    } catch (error) {
        
    }
}

async function getClasses(){
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    get10Weapons,
    getKPIs,
    getClasses
}