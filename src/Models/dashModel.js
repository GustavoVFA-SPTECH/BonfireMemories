const database = require("../Database/config.js");


async function get10Weapons(){
    try {
        const Weapons = database.executar("SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'weapon' GROUP BY name ORDER BY qtd DESC LIMIT 10;")
        
        return Weapons;
    } catch (error) {
        
    }
}

async function getKPIs() {
    try {
        const mostWeaponResult = await database.executar(`
            SELECT name, COUNT(name) as qtd 
            FROM equipament 
            WHERE type = 'weapon' 
            GROUP BY name 
            ORDER BY qtd DESC 
            LIMIT 1;
        `);

        const mostRingResult = await database.executar(`
            SELECT name, COUNT(name) as qtd 
            FROM equipament 
            WHERE type = 'ring' 
            GROUP BY name 
            ORDER BY qtd DESC 
            LIMIT 1;
        `);

        const mostClassResult = await database.executar(`
            SELECT class, COUNT(class) as qtd 
            FROM build 
            GROUP BY class 
            ORDER BY qtd DESC 
            LIMIT 1;
        `);

        const MostWeapon = mostWeaponResult[0];
        const MostRing = mostRingResult[0];
        const MostClass = mostClassResult[0];

        return { MostWeapon, MostRing, MostClass };
    } catch (error) {
        console.error('Erro ao executar consultas para KPIs:', error);
        throw error;
    }
}

async function getClasses(){
    try {
        const classes = database.executar("SELECT class, COUNT(class) as qtd FROM Build GROUP BY class ORDER BY qtd DESC")
        
        return classes;
    } catch (error) {
        
    }
}

async function getRings(){
    try {
        const Rings = database.executar("SELECT name, COUNT(name) as qtd FROM equipament WHERE type = 'ring' GROUP BY name ORDER BY qtd DESC")
        
        return Rings;
    } catch (error) {
        
    }
}

module.exports = {
    get10Weapons,
    getKPIs,
    getRings,
    getClasses
}