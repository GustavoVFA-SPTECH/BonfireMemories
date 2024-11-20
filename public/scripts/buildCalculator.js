const classes = {
  Knight: {
    level: 9,
    vigor: 12,
    attunement: 10,
    endurance: 11,
    vitality: 15,
    strength: 13,
    dexterity: 12,
    intelligence: 9,
    faith: 9,
    luck: 7,
  },
  Mercenary: {
    level: 8,
    vigor: 11,
    attunement: 12,
    endurance: 10,
    vitality: 10,
    strength: 10,
    dexterity: 16,
    intelligence: 10,
    faith: 8,
    luck: 9,
  },
  Warrior: {
    level: 7,
    vigor: 14,
    attunement: 6,
    endurance: 12,
    vitality: 11,
    strength: 16,
    dexterity: 9,
    intelligence: 8,
    faith: 9,
    luck: 11,
  },
  Herald: {
    level: 9,
    vigor: 12,
    attunement: 10,
    endurance: 9,
    vitality: 12,
    strength: 12,
    dexterity: 11,
    intelligence: 8,
    faith: 13,
    luck: 11,
  },
  Thief: {
    level: 6,
    vigor: 10,
    attunement: 10,
    endurance: 9,
    vitality: 9,
    strength: 6,
    dexterity: 15,
    intelligence: 12,
    faith: 9,
    luck: 15,
  },
  Assassin: {
    level: 5,
    vigor: 9,
    attunement: 11,
    endurance: 10,
    vitality: 8,
    strength: 9,
    dexterity: 15,
    intelligence: 12,
    faith: 9,
    luck: 12,
  },
  Pyromancer: {
    level: 8,
    vigor: 9,
    attunement: 14,
    endurance: 9,
    vitality: 9,
    strength: 8,
    dexterity: 10,
    intelligence: 16,
    faith: 8,
    luck: 7,
  },
  Cleric: {
    level: 8,
    vigor: 11,
    attunement: 13,
    endurance: 9,
    vitality: 9,
    strength: 9,
    dexterity: 8,
    intelligence: 9,
    faith: 16,
    luck: 7,
  },
  Sorcerer: {
    level: 6,
    vigor: 8,
    attunement: 16,
    endurance: 7,
    vitality: 8,
    strength: 6,
    dexterity: 8,
    intelligence: 16,
    faith: 7,
    luck: 7,
  },
  Deprived: {
    level: 6,
    vigor: 10,
    attunement: 8,
    endurance: 11,
    vitality: 10,
    strength: 8,
    dexterity: 8,
    intelligence: 8,
    faith: 8,
    luck: 8,
  },
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
  const initialLevel =
    parseInt(document.getElementById("initialLevel").value) || 0;

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
  const initialValue =
    parseInt(document.getElementById(`initial${attribute}`).value) || 0;
  const finalValue =
    parseInt(document.getElementById(`final${attribute}`).value) || 0;
  return finalValue - initialValue;
}

function calcularStatus() {
  const vigor = parseInt(document.getElementById("finalVigor").value) || 0;
  const attunement =
    parseInt(document.getElementById("finalAttunement").value) || 0;
  const endurance =
    parseInt(document.getElementById("finalEndurance").value) || 0;
  const vitality =
    parseInt(document.getElementById("finalVitality").value) || 0;
  const strength =
    parseInt(document.getElementById("finalStrength").value) || 0;
  const dexterity =
    parseInt(document.getElementById("finalDexterity").value) || 0;
  const intelligence =
    parseInt(document.getElementById("finalIntelligence").value) || 0;
  const faith = parseInt(document.getElementById("finalFaith").value) || 0;
  const luck = parseInt(document.getElementById("finalLuck").value) || 0;

  const hp = calcularHP(vigor).toFixed(0);
  const fp = calcularFP(attunement).toFixed(0);
  const stamina = calcularStamina(endurance).toFixed(0);
  const poise = calcularPoise(endurance).toFixed(1);
  const equipLoad = calcularEquipLoad(endurance, vitality).toFixed(2);
  const attunementSlots = calcularAttunementSlots(attunement).toFixed(0);
  const itemDiscovery = calcularItemDiscovery(luck).toFixed(0);
  const resistancePoison = calcularResistenciaVeneno(endurance).toFixed(2);
  const resistanceBleed = calcularResistenciaBleed(vitality).toFixed(2);
  const resistanceFrost = calcularResistenciaFrost(endurance).toFixed(2);
  const resistanceCurse = calcularResistenciaCurse(luck).toFixed(2);
  const resistancePhysical = calcularResistenciaFisica(vitality).toFixed(2);
  const defesaMagica = calcularDefesaMagica(intelligence).toFixed(2);
  const defesaFogo = calcularDefesaFogo(faith).toFixed(2);
  const defesaLightning = calcularDefesaLightning(faith).toFixed(2);
  const defesaDark = calcularDefesaDark(intelligence).toFixed(2);

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
  setStatusValue("finalBlood", resistanceBleed);
  setStatusValue("finalFrost", resistanceFrost);
  setStatusValue("finalCurse", resistanceCurse);
  setStatusValue("finalMagicDef", defesaMagica);
  setStatusValue("finalFireDef", defesaFogo);
  setStatusValue("finalLightningDef", defesaLightning);
  setStatusValue("finalDarkDef", defesaDark);
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

function calcularResistenciaBleed(vitality) {
  return 10 + vitality * 2;
}

function calcularResistenciaFrost(endurance) {
  return 10 + endurance * 1.5;
}

function calcularResistenciaCurse(luck) {
  return 10 + luck * 1.2;
}

function calcularDefesaMagica(intelligence) {
  return 10 + intelligence * 2;
}

function calcularDefesaFogo(faith) {
  return 10 + faith * 1.8;
}

function calcularDefesaLightning(faith) {
  return 10 + faith * 1.5;
}

function calcularDefesaDark(intelligence) {
  return 10 + intelligence * 1.7;
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

document
  .getElementById("upVigor")
  .addEventListener("click", () => adjustAttribute("finalVigor", 1));
document
  .getElementById("downVigor")
  .addEventListener("click", () => adjustAttribute("finalVigor", -1));

document
  .getElementById("upAttunement")
  .addEventListener("click", () => adjustAttribute("finalAttunement", 1));
document
  .getElementById("downAttunement")
  .addEventListener("click", () => adjustAttribute("finalAttunement", -1));

document
  .getElementById("upEndurance")
  .addEventListener("click", () => adjustAttribute("finalEndurance", 1));
document
  .getElementById("downEndurance")
  .addEventListener("click", () => adjustAttribute("finalEndurance", -1));

document
  .getElementById("upVitality")
  .addEventListener("click", () => adjustAttribute("finalVitality", 1));
document
  .getElementById("downVitality")
  .addEventListener("click", () => adjustAttribute("finalVitality", -1));

document
  .getElementById("upStrength")
  .addEventListener("click", () => adjustAttribute("finalStrength", 1));
document
  .getElementById("downStrength")
  .addEventListener("click", () => adjustAttribute("finalStrength", -1));

document
  .getElementById("upDexterity")
  .addEventListener("click", () => adjustAttribute("finalDexterity", 1));
document
  .getElementById("downDexterity")
  .addEventListener("click", () => adjustAttribute("finalDexterity", -1));

document
  .getElementById("upIntelligence")
  .addEventListener("click", () => adjustAttribute("finalIntelligence", 1));
document
  .getElementById("downIntelligence")
  .addEventListener("click", () => adjustAttribute("finalIntelligence", -1));

document
  .getElementById("upFaith")
  .addEventListener("click", () => adjustAttribute("finalFaith", 1));
document
  .getElementById("downFaith")
  .addEventListener("click", () => adjustAttribute("finalFaith", -1));

document
  .getElementById("upLuck")
  .addEventListener("click", () => adjustAttribute("finalLuck", 1));
document
  .getElementById("downLuck")
  .addEventListener("click", () => adjustAttribute("finalLuck", -1));

let armas = {};

async function carregarArmas() {
  try {
    const response = await fetch("../scripts/weapons.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON das armas");
    }
    armas = await response.json();
  } catch (error) {
    console.error("Falha ao carregar armas:", error);
  }
}

async function preencherArmasNosSelects() {
  await carregarArmas();

  if (!armas || Object.keys(armas).length === 0) {
    console.error("As armas não foram carregadas corretamente.");
    return;
  }

  const selectR1 = document.getElementById("R1Select");
  const selectR2 = document.getElementById("R2Select");
  const selectR3 = document.getElementById("R3Select");
  const selectL1 = document.getElementById("L1Select");
  const selectL2 = document.getElementById("L2Select");
  const selectL3 = document.getElementById("L3Select");

  const adicionarOpcoesAoSelect = (selectElement, armas) => {
    selectElement.innerHTML = "";

    const optionDefault = document.createElement("option");
    optionDefault.value = "#";
    optionDefault.textContent = "Selecione a arma";
    selectElement.appendChild(optionDefault);

    for (let categoria in armas) {
      const categoriaArmas = armas[categoria];
      for (let weaponName in categoriaArmas) {
        const weapon = categoriaArmas[weaponName];

        const option = document.createElement("option");
        option.value = weaponName;
        option.textContent = `${weaponName} (${categoria})`;

        selectElement.appendChild(option);
      }
    }
  };

  adicionarOpcoesAoSelect(selectR1, armas);
  adicionarOpcoesAoSelect(selectR2, armas);
  adicionarOpcoesAoSelect(selectR3, armas);
  adicionarOpcoesAoSelect(selectL1, armas);
  adicionarOpcoesAoSelect(selectL2, armas);
  adicionarOpcoesAoSelect(selectL3, armas);
}

function getArmaDados(weaponName, armas) {
  for (let categoria in armas) {
    const categoriaArmas = armas[categoria];
    if (categoriaArmas[weaponName]) {
      return categoriaArmas[weaponName];
    }
  }
  return null;
}

function calcularEscalamento(escala, atributo) {
  const escalas = {
    E: 0.5,
    D: 0.75,
    C: 1.0,
    B: 1.25,
    A: 1.5,
    S: 2.0,
  };

  const fatorEscalamento = escalas[escala] || 0;

  return atributo * fatorEscalamento;
}

async function atualizarDanoArma(selectId) {
  const selectElement = document.getElementById(selectId);
  const weaponName = selectElement.value;

  if (!weaponName) {
    console.warn(`Nenhuma arma selecionada no ${selectId}`);
    return;
  }

  if (!armas || Object.keys(armas).length === 0) {
    console.error("As armas não foram carregadas corretamente.");
    return;
  }

  const arma = getArmaDados(weaponName, armas);
  if (!arma) {
    console.warn(`Arma ${weaponName} não encontrada.`);
    return;
  }

  const playerStats = {
    strength: parseInt(document.getElementById("finalStrength").value) || 0,
    dexterity: parseInt(document.getElementById("finalDexterity").value) || 0,
    intelligence:
      parseInt(document.getElementById("finalIntelligence").value) || 0,
    faith: parseInt(document.getElementById("finalFaith").value) || 0,
  };

  const weight = parseFloat(arma.Weight);
  const atk = parseFloat(arma.Atk.Physical);
  const scales = arma.Scales;

  let danoCalculado = atk;

  if (scales.Str && playerStats.strength > 0) {
    danoCalculado += calcularEscalamento(scales.Str, playerStats.strength);
  }
  if (scales.Dex && playerStats.dexterity > 0) {
    danoCalculado += calcularEscalamento(scales.Dex, playerStats.dexterity);
  }

  if (isNaN(danoCalculado)) {
    console.error("Erro: Dano calculado não é um número válido.");
    return;
  }

  const resultadoDanoId = `final${selectId.replace("Select", "")}Weapon`;
  const resultadoDanoElement = document.getElementById(resultadoDanoId);

  if (resultadoDanoElement) {
    resultadoDanoElement.innerHTML = `${danoCalculado.toFixed(0)}`;
  } else {
    console.warn(
      `Elemento de resultado de dano não encontrado para ${resultadoDanoId}`
    );
  }
}

document.getElementById("R1Select").addEventListener("change", () => atualizarDanoArma("R1Select"));
document.getElementById("R2Select").addEventListener("change", () => atualizarDanoArma("R2Select"));
document.getElementById("R3Select").addEventListener("change", () => atualizarDanoArma("R3Select"));
document.getElementById("L1Select").addEventListener("change", () => atualizarDanoArma("L1Select"));
document.getElementById("L2Select").addEventListener("change", () => atualizarDanoArma("L2Select"));
document.getElementById("L3Select").addEventListener("change", () => atualizarDanoArma("L3Select"));

document.addEventListener("DOMContentLoaded", preencherArmasNosSelects);

async function carregarArmaduras() {
  try {
    const response = await fetch("../scripts/armors.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON das armaduras");
    }
    return await response.json();
  } catch (error) {
    console.error("Falha ao carregar armaduras:", error);
    return {};
  }
}

async function preencherArmadurasNosSelects() {
  const armaduras = await carregarArmaduras();

  if (!armaduras || Object.keys(armaduras).length === 0) {
    console.error("As armaduras não foram carregadas corretamente.");
    return;
  }

  const selectCapacetes = document.getElementById("helmetSelect");
  const selectPeitorais = document.getElementById("chestSelect");
  const selectLuvas = document.getElementById("handsSelect");
  const selectCalcas = document.getElementById("legsSelect");

  const adicionarOpcoesAoSelect = (selectElement, armadurasArray) => {
    selectElement.innerHTML = "";

    const optionDefault = document.createElement("option");
    optionDefault.value = "#";
    optionDefault.textContent = "Selecione uma armadura";
    selectElement.appendChild(optionDefault);

    armadurasArray.forEach((armadura) => {
      const option = document.createElement("option");
      option.value = armadura;
      option.textContent = armadura;
      selectElement.appendChild(option);
    });
  };

  adicionarOpcoesAoSelect(selectCapacetes, armaduras.helmets);
  adicionarOpcoesAoSelect(selectPeitorais, armaduras.chests);
  adicionarOpcoesAoSelect(selectLuvas, armaduras.hands);
  adicionarOpcoesAoSelect(selectCalcas, armaduras.legs);
}

document.addEventListener("DOMContentLoaded", preencherArmadurasNosSelects);

let aneis = {};

async function carregarAneis() {
  try {
    const response = await fetch("../scripts/rings.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON dos anéis");
    }
    const json = await response.json();
    aneis = json.rings;
  } catch (error) {
    console.error("Falha ao carregar anéis:", error);
  }
}

async function preencherAneisNosSelects() {
  await carregarAneis();

  if (!aneis || aneis.length === 0) {
    console.error("Os anéis não foram carregados corretamente.");
    return;
  }

  const selectRing1 = document.getElementById("Ring1Select");
  const selectRing2 = document.getElementById("Ring2Select");
  const selectRing3 = document.getElementById("Ring3Select");
  const selectRing4 = document.getElementById("Ring4Select");

  const selects = [selectRing1, selectRing2, selectRing3, selectRing4];

  const aneisEquipados = new Set();

  const atualizarOpcoes = () => {
    selects.forEach((select) => {
      aneisEquipados.clear();
  
      selects.forEach((s) => {
        if (s.value) {
          aneisEquipados.add(s.value);
        }
      });
  
      const valorAtual = select.value;
      select.innerHTML = "";  
  
      
      const optionDefault = document.createElement("option");
      optionDefault.value = "";  
      optionDefault.textContent = "Selecione um anel";
      select.appendChild(optionDefault);
  
      
      aneis.forEach((anel) => {
        const option = document.createElement("option");
        option.value = anel;
        option.textContent = anel;
  
        
        if (!aneisEquipados.has(anel) || anel === valorAtual || valorAtual === "#") {
          select.appendChild(option);
        }
      });
  
      
      if (valorAtual === "#") {
        select.value = "#";  
      } else {
        select.value = valorAtual;  
      }
    });
  };
  
  atualizarOpcoes();
  
  selects.forEach((select) => {
    select.addEventListener("change", atualizarOpcoes);
  });
}

document.addEventListener("DOMContentLoaded", preencherAneisNosSelects);

let feits = {};

async function carregarFeiticos() {
  try {
    const response = await fetch("../scripts/spells.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON dos feitiços");
    }
    feits = await response.json();
  } catch (error) {
    console.error("Falha ao carregar feitiços:", error);
  }
}

async function preencherFeiticosNosSelects() {
  await carregarFeiticos();

  if (!feits || Object.keys(feits).length === 0) {
    console.error("Os feitiços não foram carregados corretamente.");
    return;
  }

  const todosFeiticos = [
    ...feits.spells.sorceries.map((spell) => ({
      name: spell,
      category: "Sorcery",
    })),
    ...feits.spells.pyromancies.map((spell) => ({
      name: spell,
      category: "Pyromancy",
    })),
    ...feits.spells.miracles.map((spell) => ({
      name: spell,
      category: "Miracle",
    })),
    ...feits.spells.dark_magics.map((spell) => ({
      name: spell,
      category: "Dark Magic",
    })),
  ];

  const selects = [];
  for (let i = 1; i <= 12; i++) {
    selects.push(document.getElementById(`${i}Spell`));
  }

  const feiticosEquipados = new Set();

  const atualizarOpcoes = () => {
    selects.forEach((select) => {
      const valorSelecionado = select.value;
      feiticosEquipados.clear();

      selects.forEach((s) => {
        if (s.value) {
          feiticosEquipados.add(s.value);
        }
      });

      selects.forEach((s) => {
        const valorAtual = s.value;
        s.innerHTML = "";

        const optionDefault = document.createElement("option");
        optionDefault.value = "";
        optionDefault.textContent = "Selecione um feitiço";
        s.appendChild(optionDefault);

        todosFeiticos.forEach((spell) => {
          const option = document.createElement("option");
          option.value = spell.name;
          option.textContent = `${spell.name} (${spell.category})`;

          if (!feiticosEquipados.has(spell.name) || spell.name === valorAtual) {
            s.appendChild(option);
          }
        });

        s.value = valorAtual;
      });
    });
  };

  atualizarOpcoes();

  selects.forEach((select) => {
    select.addEventListener("change", atualizarOpcoes);
  });
}

document.addEventListener("DOMContentLoaded", preencherFeiticosNosSelects);


document.addEventListener("DOMContentLoaded", () => {
  const saveStatsButton = document.getElementById("saveStatsButton");
  if (saveStatsButton) {
      saveStatsButton.addEventListener("click", async () => {
          
          const stats = {
              level: parseInt(document.getElementById("finalLevel").value) || 0,
              vigor: parseInt(document.getElementById("finalVigor").value) || 0,
              attunement: parseInt(document.getElementById("finalAttunement").value) || 0,
              endurence: parseInt(document.getElementById("finalEndurance").value) || 0,
              vitality: parseInt(document.getElementById("finalVitality").value) || 0,
              strength: parseInt(document.getElementById("finalStrength").value) || 0,
              dexterity: parseInt(document.getElementById("finalDexterity").value) || 0,
              inteligence: parseInt(document.getElementById("finalIntelligence").value) || 0,
              faith: parseInt(document.getElementById("finalFaith").value) || 0,
              luck: parseInt(document.getElementById("finalLuck").value) || 0,
          };

          
          const build = {
              name: document.getElementById("buildName").value || "Default Build",
              class: document.getElementById("class").value || "Default Class", 
              buildOwner: '1', 
          };

          
          const equipment = [
              { name: document.getElementById("R1Select").value, type: "weapon" },
              { name: document.getElementById("R2Select").value, type: "weapon" },
              { name: document.getElementById("R3Select").value, type: "weapon" },
              { name: document.getElementById("L1Select").value, type: "weapon" },
              { name: document.getElementById("L2Select").value, type: "weapon" },
              { name: document.getElementById("L3Select").value, type: "weapon" },
              { name: document.getElementById("Ring1Select").value, type: "ring" },
              { name: document.getElementById("Ring2Select").value, type: "ring" },
              { name: document.getElementById("Ring3Select").value, type: "ring" },
              { name: document.getElementById("Ring4Select").value, type: "ring" },
              { name: document.getElementById("helmetSelect").value, type: "helmet" },
              { name: document.getElementById("chestSelect").value, type: "chest" },
              { name: document.getElementById("handsSelect").value, type: "hands" },
              { name: document.getElementById("legsSelect").value, type: "legs" }
          ]
          
          .filter(equip => equip.name !== "" && equip.name !== "#")  
          
          .map(equip => ({ name: equip.name, type: equip.type }));

          try {
              fetch("/saveBuild",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stats, build, equipment })
              })
          
              
              console.log(stats, equipment, build);
              alert("Build saved successfully!");
          } catch (error) {
              console.error("Error saving build:", error);
              alert("Failed to save build.");
          }
      });
  } else {
      console.error("Save Stats Button not found in the DOM.");
  }
});

// Função global para carregar a build
const loadBuildData = async (buildID) => {
  try {
    if (!buildID) {
      alert("Build ID não fornecido.");
      return;
    }

    closeList(); // Se necessário, adicione a lógica de fechamento da lista

    const response = await fetch(`/builds/${buildID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar a build");
    }

    const data = await response.json();
    
    const { stats, build, equipment } = data;
    document.getElementById("buildName").value = build.name || 0;
    document.getElementById("class").value = build.class || 0;

    setInitialAttributes();

    // Preencher os campos do formulário com os dados recebidos
    document.getElementById("finalLevel").value = Number(stats.level) || 0;
    document.getElementById("finalVigor").value = Number(stats.vigor) || 0;
    document.getElementById("finalAttunement").value = Number(stats.attunement) || 0;
    document.getElementById("finalEndurance").value = Number(stats.endurence) || 0;
    document.getElementById("finalVitality").value = Number(stats.vitality) || 0;
    document.getElementById("finalStrength").value = Number(stats.strength) || 0;
    document.getElementById("finalDexterity").value = Number(stats.dexterity) || 0;
    document.getElementById("finalIntelligence").value = Number(stats.inteligence) || 0;
    document.getElementById("finalFaith").value = Number(stats.faith) || 0;
    document.getElementById("finalLuck").value = Number(stats.luck) || 0;

    calcularStatus();
    // Preencher os campos de equipamentos
    equipment.forEach((equip) => {
      if (equip.type === "weapon") {
        // Verifica e preenche apenas se o valor do select for # ou ""
        if (document.getElementById("R1Select").value === "#" || document.getElementById("R1Select").value === "") {
          document.getElementById("R1Select").value = equip.name;
        } else if (document.getElementById("R2Select").value === "#" || document.getElementById("R2Select").value === "") {
          document.getElementById("R2Select").value = equip.name;
        } else if (document.getElementById("R3Select").value === "#" || document.getElementById("R3Select").value === "") {
          document.getElementById("R3Select").value = equip.name;
        } else if (document.getElementById("L1Select").value === "#" || document.getElementById("L1Select").value === "") {
          document.getElementById("L1Select").value = equip.name;
        } else if (document.getElementById("L2Select").value === "#" || document.getElementById("L2Select").value === "") {
          document.getElementById("L2Select").value = equip.name;
        } else if (document.getElementById("L3Select").value === "#" || document.getElementById("L3Select").value === "") {
          document.getElementById("L3Select").value = equip.name;
        }
      } else if (equip.type === "ring") {
        // Verifica e preenche apenas se o valor do select for # ou ""
        if (document.getElementById("Ring1Select").value === "#" || document.getElementById("Ring1Select").value === "") {
          document.getElementById("Ring1Select").value = equip.name;
        } else if (document.getElementById("Ring2Select").value === "#" || document.getElementById("Ring2Select").value === "") {
          document.getElementById("Ring2Select").value = equip.name;
        } else if (document.getElementById("Ring3Select").value === "#" || document.getElementById("Ring3Select").value === "") {
          document.getElementById("Ring3Select").value = equip.name;
        } else if (document.getElementById("Ring4Select").value === "#" || document.getElementById("Ring4Select").value === "") {
          document.getElementById("Ring4Select").value = equip.name;
        }
      } else if (equip.type === "helmet") {
        // Verifica e preenche apenas se o valor do select for # ou ""
        if (document.getElementById("helmetSelect").value === "#" || document.getElementById("helmetSelect").value === "") {
          document.getElementById("helmetSelect").value = equip.name;
        }
      } else if (equip.type === "chest") {
        // Verifica e preenche apenas se o valor do select for # ou ""
        if (document.getElementById("chestSelect").value === "#" || document.getElementById("chestSelect").value === "") {
          document.getElementById("chestSelect").value = equip.name;
        }
      } else if (equip.type === "hands") {
        // Verifica e preenche apenas se o valor do select for # ou ""
        if (document.getElementById("handsSelect").value === "#" || document.getElementById("handsSelect").value === "") {
          document.getElementById("handsSelect").value = equip.name;
        }
      } else if (equip.type === "legs") {
        // Verifica e preenche apenas se o valor do select for # ou ""
        if (document.getElementById("legsSelect").value === "#" || document.getElementById("legsSelect").value === "") {
          document.getElementById("legsSelect").value = equip.name;
        }
      }
    });

    atualizarDanoArma("R1Select");
    atualizarDanoArma("R2Select");
    atualizarDanoArma("R3Select");
    atualizarDanoArma("L1Select");
    atualizarDanoArma("L2Select");
    atualizarDanoArma("L3Select");

    console.log("Build carregada com sucesso:", data);
  } catch (error) {
    console.error("Erro ao carregar a build:", error);
    alert("Falha ao carregar a build.");
  }
};

// Função para carregar as builds e exibi-las na lista
const loadButton = document.getElementById("loadButton");
if (loadButton) {
  loadButton.addEventListener("click", async () => {
    openList(); // Lógica para abrir a lista (se necessário)
    try {
      const userID = 1; // Exemplo de ID do usuário

      const response = await fetch(`/load?userID=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar builds");
      }

      const builds = await response.json();
      const buildListContainer = document.getElementById("buildList");

      if (!buildListContainer) {
        console.error("Elemento buildList não encontrado.");
        return;
      }

      buildListContainer.innerHTML = ""; // Limpa a lista antes de adicionar as novas builds

      builds.forEach((build) => {
        const buildDiv = document.createElement("div");
        buildDiv.className = "listItem";

        // Usar addEventListener para associar o evento de clique
        buildDiv.addEventListener("click", () => loadBuildData(build.idBuild));

        const buildNameSpan = document.createElement("span");
        buildNameSpan.className = "buildListName";
        buildNameSpan.textContent = build.name;

        const buildLevelSpan = document.createElement("span");
        buildLevelSpan.className = "buildListLevel";
        buildLevelSpan.textContent = build.level || "Nível desconhecido";

        buildDiv.appendChild(buildNameSpan);
        buildDiv.appendChild(buildLevelSpan);

        buildListContainer.appendChild(buildDiv);
      });

      console.log("Builds carregadas com sucesso:", builds);
    } catch (error) {
      console.error("Erro ao carregar builds:", error);
      alert("Falha ao carregar builds.");
    }
  });
} else {
  console.error("Botão loadButton não encontrado no DOM.");
}

    



