// Define atributos iniciais das classes
const classes = {
    "Knight": { level: 9, vigor: 12, attunement: 10, endurance: 11, vitality: 15, strength: 13, dexterity: 12, intelligence: 9, faith: 9, luck: 7 },
    "Mercenary": { level: 8, vigor: 11, attunement: 12, endurance: 10, vitality: 10, strength: 10, dexterity: 16, intelligence: 10, faith: 8, luck: 9 },
    "Warrior": { level: 7, vigor: 14, attunement: 6, endurance: 12, vitality: 11, strength: 16, dexterity: 9, intelligence: 8, faith: 9, luck: 11 },
    "Herald": { level: 9, vigor: 12, attunement: 10, endurance: 9, vitality: 12, strength: 12, dexterity: 11, intelligence: 8, faith: 13, luck: 11 }
};

// Função para configurar os atributos iniciais ao selecionar uma classe
function setInitialAttributes() {
    const selectedClass = document.getElementById("class").value;
    const classStats = classes[selectedClass];

    // Definindo valores iniciais apenas se os elementos existem no HTML
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

    // Define os valores finais como iguais aos iniciais ao escolher a classe
    setAttributeValue("finalVigor", classStats.vigor);
    setAttributeValue("finalAttunement", classStats.attunement);
    setAttributeValue("finalEndurance", classStats.endurance);
    setAttributeValue("finalVitality", classStats.vitality);
    setAttributeValue("finalStrength", classStats.strength);
    setAttributeValue("finalDexterity", classStats.dexterity);
    setAttributeValue("finalIntelligence", classStats.intelligence);
    setAttributeValue("finalFaith", classStats.faith);
    setAttributeValue("finalLuck", classStats.luck);

    // Calcula os status iniciais
    calcularStatus();
    calcularFinalLevel();  // Atualiza o nível final
}

// Função para calcular o nível final, considerando o nível inicial e os aumentos nos atributos
function calcularFinalLevel() {
    const initialLevel = parseInt(document.getElementById("initialLevel").value) || 0;
    
    let totalIncrease = 0;

    // Calcula o aumento de nível com base nos atributos
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

// Função para calcular o aumento no nível para um atributo específico
function calculateLevelIncrease(attribute) {
    const initialValue = parseInt(document.getElementById(`initial${attribute}`).value) || 0;
    const finalValue = parseInt(document.getElementById(`final${attribute}`).value) || 0;
    return finalValue - initialValue;
}

// Função para calcular os status de acordo com os atributos
function calcularStatus() {
    const vigor = parseInt(document.getElementById("finalVigor").value) || 0;
    const attunement = parseInt(document.getElementById("finalAttunement").value) || 0;
    const endurance = parseInt(document.getElementById("finalEndurance").value) || 0;

    const hp = calcularHP(vigor);
    const fp = calcularFP(attunement);
    const stamina = calcularStamina(endurance);

    // Verifica a existência dos elementos antes de atribuir valores
    const setStatusValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        } else {
            console.warn(`Elemento com ID ${id} não encontrado no HTML.`);
        }
    };

    setStatusValue("finalHP", hp);
    setStatusValue("finalFP", fp);
    setStatusValue("finalStamina", stamina);
}

// Fórmulas para calcular HP, FP e Stamina
function calcularHP(vigor) {
    if (vigor <= 10) return 300 + vigor * 30;
    if (vigor <= 20) return 600 + (vigor - 10) * 20;
    if (vigor <= 30) return 800 + (vigor - 20) * 15;
    return 950 + (vigor - 30) * 5;
}

function calcularFP(attunement) {
    if (attunement <= 10) return 70 + attunement * 3;
    if (attunement <= 20) return 100 + (attunement - 10) * 2.5;
    return 125 + (attunement - 20) * 2;
}

function calcularStamina(endurance) {
    if (endurance <= 10) return 80 + endurance * 2;
    if (endurance <= 20) return 100 + (endurance - 10) * 1.5;
    return 115 + (endurance - 20) * 1;
}

// Função para ajustar atributos e recalcular status
function adjustAttribute(attribute, change) {
    const element = document.getElementById(attribute);
    if (element) {
        const currentValue = parseInt(element.value) || 0;
        element.value = Math.max(1, currentValue + change); // Evita valores abaixo de 1
        calcularStatus();
        calcularFinalLevel();  // Atualiza o nível final após o ajuste
    } else {
        console.warn(`Elemento com ID ${attribute} não encontrado no HTML.`);
    }
}

// Inicializa a seleção da classe e os eventos dos botões ao carregar a página
window.onload = function () {
    // Adiciona listener para alterar a classe
    document.getElementById("class").addEventListener("change", setInitialAttributes);

    // Atributos que terão ajuste de valores
    const attributes = [
        "Vigor", "Attunement", "Endurance", "Vitality", 
        "Strength", "Dexterity", "Intelligence", "Faith", "Luck"
    ];
    
    // Adiciona listeners para os botões de ajuste de atributos
    attributes.forEach(attr => {
        const upButton = document.getElementById(`up${attr}`);
        const downButton = document.getElementById(`down${attr}`);
        const finalAttribute = document.getElementById(`final${attr}`);

        if (upButton && downButton && finalAttribute) {
            upButton.addEventListener("click", () => adjustAttribute(`final${attr}`, 1));
            downButton.addEventListener("click", () => adjustAttribute(`final${attr}`, -1));
        } else {
            console.warn(`Botões ou campos para ${attr} não foram encontrados.`);
        }
    });

    // Calcula o nível final com base na classe selecionada
    calcularFinalLevel();
    // Configura os atributos iniciais com a classe padrão ao carregar
    setInitialAttributes();
};
