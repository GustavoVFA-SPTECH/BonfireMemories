const database = require("../Database/config.js");


async function get10Weapons(){
    try {
        const Weapons = database.executar("SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'weapon' GROUP BY name ORDER BY qtd DESC LIMIT 10;")
        
        return Weapons;
    } catch (error) {
        
    }
}

async function getKPIs(){
    try {
        const [MostWeapon] = database.executar(`SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'weapon' GROUP BY name ORDER BY qtd DESC LIMIT 1;`);
        const [MostRing] = database.executar(`SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'ring' GROUP BY name ORDER BY qtd DESC LIMIT 1;`);
        const [MostClass] = database.executar("SELECT class, COUNT(class) as qtd FROM build GROUP BY class ORDER BY qtd DESC LIMIT 1;")

        return {MostWeapon, MostRing, MostClass}
    } catch (error) {
        
    }
}

async function getClasses(){
    try {
        const classes = database.executar("SELECT class, COUNT(class) as qtd FROM Build GROUP BY class ORDER BY qtd DESC")
        
        return classes;
    } catch (error) {
        
    }
}

module.exports = {
    get10Weapons,
    getKPIs,
    getClasses
}