// Variáveis para os atributos principais
let vigor = 1;
let attunement = 1;
let endurance = 1;
let vitality = 1;
let strength = 1;
let dexterity = 1;
let intelligence = 1;
let faith = 1;
let luck = 1;

// Variáveis para as estatísticas derivadas
let hp = calculateHP(vigor);
let fp = calculateFP(attunement);
let stamina = calculateStamina(endurance);
let equipLoad = calculateEquipLoad(vitality);
let itemDiscovery = calculateItemDiscovery(luck);

// Funções de cálculo para cada estatística derivada
function calculateHP(vigor) {
    return 300 + vigor * 10; // Exemplo: base de 300 HP, 10 por ponto de Vigor
}

function calculateFP(attunement) {
    return 50 + attunement * 5; // Base de 50 FP, 5 por ponto de Attunement
}

function calculateStamina(endurance) {
    return 90 + endurance * 5; // Base de 90 de Stamina, 5 por ponto de Endurance
}

function calculateEquipLoad(vitality) {
    return 40 + vitality * 2; // Base de 40 de Equip Load, 2 por ponto de Vitality
}

function calculateItemDiscovery(luck) {
    return 100 + luck * 2; // Base de 100 de Item Discovery, 2 por ponto de Luck
}

// Função para atualizar todas as estatísticas na interface
function updateStats() {
    document.querySelector('.statHP .futureValueStat').innerHTML = calculateHP(vigor);
    document.querySelector('.statFP .futureValueStat').innerHTML = calculateFP(attunement);
    document.querySelector('.statStamina .futureValueStat').innerHTML = calculateStamina(endurance);
    document.querySelector('.statEquipLoad .futureValueStat').innerHTML = calculateEquipLoad(vitality);
    document.querySelector('.statItemDiscovery .futureValueStat').innerHTML = calculateItemDiscovery(luck);
}

// Event listeners para os botões de aumento e diminuição
document.querySelectorAll('.statButtonUp').forEach(button => {
    button.addEventListener('click', (event) => {
        const statName = event.target.closest('.stat').querySelector('.statName').innerHTML;
        if (statName === 'Vigor') vigor++;
        else if (statName === 'Attunement') attunement++;
        else if (statName === 'Endurance') endurance++;
        else if (statName === 'Vitality') vitality++;
        else if (statName === 'Strength') strength++;
        else if (statName === 'Dexterity') dexterity++;
        else if (statName === 'Intelligence') intelligence++;
        else if (statName === 'Faith') faith++;
        else if (statName === 'Luck') luck++;
        
        updateStats();
    });
});

document.querySelectorAll('.statButtonDown').forEach(button => {
    button.addEventListener('click', (event) => {
        const statName = event.target.closest('.stat').querySelector('.statName').innerHTML;
        if (statName === 'Vigor' && vigor > 1) vigor--;
        else if (statName === 'Attunement' && attunement > 1) attunement--;
        else if (statName === 'Endurance' && endurance > 1) endurance--;
        else if (statName === 'Vitality' && vitality > 1) vitality--;
        else if (statName === 'Strength' && strength > 1) strength--;
        else if (statName === 'Dexterity' && dexterity > 1) dexterity--;
        else if (statName === 'Intelligence' && intelligence > 1) intelligence--;
        else if (statName === 'Faith' && faith > 1) faith--;
        else if (statName === 'Luck' && luck > 1) luck--;
        
        updateStats();
    });
});

// Inicializar valores
updateStats();
