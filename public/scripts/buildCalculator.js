
const classes = {
    "Knight": { level: 9, vigor: 12, attunement: 10, endurance: 11, vitality: 15, strength: 13, dexterity: 12, intelligence: 9, faith: 9, luck: 7 },
    "Mercenary": { level: 8, vigor: 11, attunement: 12, endurance: 10, vitality: 10, strength: 10, dexterity: 16, intelligence: 10, faith: 8, luck: 9 },
    "Warrior": { level: 7, vigor: 14, attunement: 6, endurance: 12, vitality: 11, strength: 16, dexterity: 9, intelligence: 8, faith: 9, luck: 11 },
    "Herald": { level: 9, vigor: 12, attunement: 10, endurance: 9, vitality: 12, strength: 12, dexterity: 11, intelligence: 8, faith: 13, luck: 11 },
    "Thief": { level: 6, vigor: 10, attunement: 10, endurance: 9, vitality: 9, strength: 6, dexterity: 15, intelligence: 12, faith: 9, luck: 15 },
    "Assassin": { level: 5, vigor: 9, attunement: 11, endurance: 10, vitality: 8, strength: 9, dexterity: 15, intelligence: 12, faith: 9, luck: 12 },
    "Pyromancer": { level: 8, vigor: 9, attunement: 14, endurance: 9, vitality: 9, strength: 8, dexterity: 10, intelligence: 16, faith: 8, luck: 7 },
    "Cleric": { level: 8, vigor: 11, attunement: 13, endurance: 9, vitality: 9, strength: 9, dexterity: 8, intelligence: 9, faith: 16, luck: 7 },
    "Sorcerer": { level: 6, vigor: 8, attunement: 16, endurance: 7, vitality: 8, strength: 6, dexterity: 8, intelligence: 16, faith: 7, luck: 7 },
    "Deprived": { level: 6, vigor: 10, attunement: 8, endurance: 11, vitality: 10, strength: 8, dexterity: 8, intelligence: 8, faith: 8, luck: 8 }
};


function setInitialAttributes() {
    const selectedClass = document.getElementById("class").value;
    const classStats = classes[selectedClass];

    
    const setAttributeValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value; 
        } else {
            console.warn(`Elemento com ID ${id} não encontrado no HTML.`);
        }
    };

    setAttributeValue("initialLevel", classStats.level);
    setAttributeValue("initialVigor", classStats.vigor);
    setAttributeValue("initialAttunement", classStats.attunement);
    setAttributeValue("initialEndurance", classStats.endurance);
    setAttributeValue("initialVitality", classStats.vitality);
    setAttributeValue("initialStrength", classStats.strength);
    setAttributeValue("initialDexterity", classStats.dexterity);
    setAttributeValue("initialIntelligence", classStats.intelligence);
    setAttributeValue("initialFaith", classStats.faith);
    setAttributeValue("initialLuck", classStats.luck);

    
    setAttributeValue("finalVigor", classStats.vigor);
    setAttributeValue("finalAttunement", classStats.attunement);
    setAttributeValue("finalEndurance", classStats.endurance);
    setAttributeValue("finalVitality", classStats.vitality);
    setAttributeValue("finalStrength", classStats.strength);
    setAttributeValue("finalDexterity", classStats.dexterity);
    setAttributeValue("finalIntelligence", classStats.intelligence);
    setAttributeValue("finalFaith", classStats.faith);
    setAttributeValue("finalLuck", classStats.luck);

    
    calcularStatus();
    calcularFinalLevel();  
}


function calcularFinalLevel() {
    const initialLevel = parseInt(document.getElementById("initialLevel").value) || 0;
    
    let totalIncrease = 0;

    
    totalIncrease += calculateLevelIncrease("Vigor");
    totalIncrease += calculateLevelIncrease("Attunement");
    totalIncrease += calculateLevelIncrease("Endurance");
    totalIncrease += calculateLevelIncrease("Vitality");
    totalIncrease += calculateLevelIncrease("Strength");
    totalIncrease += calculateLevelIncrease("Dexterity");
    totalIncrease += calculateLevelIncrease("Intelligence");
    totalIncrease += calculateLevelIncrease("Faith");
    totalIncrease += calculateLevelIncrease("Luck");

    const finalLevel = initialLevel + totalIncrease;
    document.getElementById("finalLevel").value = finalLevel;
}


function calculateLevelIncrease(attribute) {
    const initialValue = parseInt(document.getElementById(`initial${attribute}`).value) || 0;
    const finalValue = parseInt(document.getElementById(`final${attribute}`).value) || 0;
    return finalValue - initialValue;
}


function calcularStatus() {
    const vigor = parseInt(document.getElementById("finalVigor").value) || 0;
    const attunement = parseInt(document.getElementById("finalAttunement").value) || 0;
    const endurance = parseInt(document.getElementById("finalEndurance").value) || 0;
    const vitality = parseInt(document.getElementById("finalVitality").value) || 0;
    const strength = parseInt(document.getElementById("finalStrength").value) || 0;
    const dexterity = parseInt(document.getElementById("finalDexterity").value) || 0;
    const intelligence = parseInt(document.getElementById("finalIntelligence").value) || 0;
    const faith = parseInt(document.getElementById("finalFaith").value) || 0;
    const luck = parseInt(document.getElementById("finalLuck").value) || 0;

    const hp = calcularHP(vigor);
    const fp = calcularFP(attunement);
    const stamina = calcularStamina(endurance);
    const poise = calcularPoise(endurance);
    const equipLoad = calcularEquipLoad(endurance, vitality);
    const attunementSlots = calcularAttunementSlots(attunement);
    const itemDiscovery = calcularItemDiscovery(luck);
    const resistancePhysical = calcularResistenciaFisica(vitality);
    const resistancePoison = calcularResistenciaVeneno(endurance);

    
    const setStatusValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = value;
        } else {
            console.warn(`Elemento com ID ${id} não encontrado no HTML.`);
        }
    };

    setStatusValue("finalHP", hp);
    setStatusValue("finalFP", fp);
    setStatusValue("finalStamina", stamina);
    setStatusValue("finalPoise", poise);
    setStatusValue("finalEquipLoad", equipLoad);
    setStatusValue("finalAttunementSlots", attunementSlots);
    setStatusValue("finalItemDiscovery", itemDiscovery);
    setStatusValue("finalPhysicalDef", resistancePhysical);
    setStatusValue("finalPoison", resistancePoison);
}


function calcularHP(vigor) {
    if (vigor <= 10) return 300 + vigor * 30;
    if (vigor <= 20) return 600 + (vigor - 10) * 20;
    if (vigor <= 40) return 800 + (vigor - 20) * 10;
    return 1000 + (vigor - 40) * 5;
}

function calcularFP(attunement) {
    if (attunement <= 10) return 100 + attunement * 5;
    if (attunement <= 20) return 150 + (attunement - 10) * 4;
    return 190 + (attunement - 20) * 3;
}

function calcularStamina(endurance) {
    if (endurance <= 10) return 80 + endurance * 2;
    if (endurance <= 20) return 100 + (endurance - 10) * 1.5;
    return 115 + (endurance - 20) * 1;
}



function calcularPoise(endurance) {
    if (endurance <= 10) return 10 + endurance * 2;
    if (endurance <= 20) return 30 + (endurance - 10) * 3;
    return 60 + (endurance - 20) * 5;
}

function calcularEquipLoad(endurance, vitality) {
    return 50 + endurance * 2 + vitality * 1.5;
}

function calcularAttunementSlots(attunement) {
    if (attunement <= 10) return 1;
    if (attunement <= 20) return 2;
    if (attunement <= 30) return 3;
    return 4;
}

function calcularItemDiscovery(luck) {
    return 100 + luck * 5;
}

function calcularResistenciaFisica(vitality) {
    return 10 + vitality * 2;
}

function calcularResistenciaVeneno(endurance) {
    return 10 + endurance * 1.5;
}


function adjustAttribute(attribute, change) {
    const element = document.getElementById(attribute);
    if (element) {
        const currentValue = parseInt(element.value) || 0;
        element.value = Math.max(1, currentValue + change); 
        calcularStatus(); 
        calcularFinalLevel();  
    } else {
        console.warn(`Elemento com ID ${attribute} não encontrado no HTML.`);
    }
}


document.getElementById("class").addEventListener("change", setInitialAttributes);


document.getElementById("upVigor").addEventListener("click", () => adjustAttribute("finalVigor", 1));
document.getElementById("downVigor").addEventListener("click", () => adjustAttribute("finalVigor", -1));

document.getElementById("upAttunement").addEventListener("click", () => adjustAttribute("finalAttunement", 1));
document.getElementById("downAttunement").addEventListener("click", () => adjustAttribute("finalAttunement", -1));

document.getElementById("upEndurance").addEventListener("click", () => adjustAttribute("finalEndurance", 1));
document.getElementById("downEndurance").addEventListener("click", () => adjustAttribute("finalEndurance", -1));

document.getElementById("upVitality").addEventListener("click", () => adjustAttribute("finalVitality", 1));
document.getElementById("downVitality").addEventListener("click", () => adjustAttribute("finalVitality", -1));

document.getElementById("upStrength").addEventListener("click", () => adjustAttribute("finalStrength", 1));
document.getElementById("downStrength").addEventListener("click", () => adjustAttribute("finalStrength", -1));

document.getElementById("upDexterity").addEventListener("click", () => adjustAttribute("finalDexterity", 1));
document.getElementById("downDexterity").addEventListener("click", () => adjustAttribute("finalDexterity", -1));

document.getElementById("upIntelligence").addEventListener("click", () => adjustAttribute("finalIntelligence", 1));
document.getElementById("downIntelligence").addEventListener("click", () => adjustAttribute("finalIntelligence", -1));

document.getElementById("upFaith").addEventListener("click", () => adjustAttribute("finalFaith", 1));
document.getElementById("downFaith").addEventListener("click", () => adjustAttribute("finalFaith", -1));

document.getElementById("upLuck").addEventListener("click", () => adjustAttribute("finalLuck", 1));
document.getElementById("downLuck").addEventListener("click", () => adjustAttribute("finalLuck", -1));