const database = require("../Database/config.js");


async function get10Weapons(){
    try {
        const Weapons = database.executar("SELECT class, COUNT(class) FROM Build GROUP BY class")
    } catch (error) {
        
    }
}

async function getKPIs(){
    try {
        
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