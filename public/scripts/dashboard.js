function checkTokenAndRedirect(redirectUrl) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = redirectUrl;
    }
  }
  
  checkTokenAndRedirect('/views/homePage.html');

async function getDataWeapons(idGrafico) {
    try {
        

        
        const response = await fetch('/weapons');
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        
        const resposta = await response.json();

        
        

        
        graphic1(resposta.data, idGrafico);

    } catch (error) {
        console.error('Erro ao buscar ou plotar os dados do gráfico de armas:', error);
    }
}

function graphic1(resposta, idGrafico) {
    

    
    let labels = [];

    
    let dados = {
        labels: labels,
        datasets: [{
            label: '',
            data: [],
            backgroundColor: '#406C94',
            borderColor: '#406C94',
            borderWidth: 1
        }]
    };

    
    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];
        labels.push(registro.name); 
        dados.datasets[0].data.push(registro.qtd); 
    }
    const config = {
        type: 'bar',
        data: dados,
        options: {
            indexAxis: 'y', // Orientação horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFF' // Cor branca para os números no eixo X
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Grade do eixo X em branco translúcido
                    }
                },
                y: {
                    ticks: {
                        color: '#FFF', // Cor branca para os rótulos no eixo Y
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Grade do eixo Y em branco translúcido
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FFF' // Cor branca para o texto da legenda
                    }
                },
                tooltip: {
                    bodyColor: '#FFF', // Cor do texto no tooltip
                    titleColor: '#FFF', // Cor do título no tooltip
                    backgroundColor: 'rgba(0, 0, 0, 0.8)' // Fundo do tooltip escuro
                }
            }
        }
    };
    
    new Chart(
        document.getElementById(`myChartCanvas${idGrafico}`),
        config
    );

    
}

getDataWeapons(1);

async function getDataClasses(idGrafico) {
    try {
        

        const response = await fetch('/classes');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const resposta = await response.json();

        
        

        graphic2(resposta.data, idGrafico);

    } catch (error) {
        console.error('Erro ao buscar ou plotar os dados do gráfico de classes:', error);
    }
};

function graphic2(resposta, idGrafico) {
    
    let labels = [];

    let dados = {
        labels: labels,
        datasets: [{
            label: 'Builds per class',
            data: [],
            backgroundColor: '#A25327',
            borderColor: '#A25327',
            borderWidth: 1
        }]
    };

    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];
        labels.push(registro.class); 
        dados.datasets[0].data.push(registro.qtd); 
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar', // Tipo de gráfico
        data: dados,
        options: {
            indexAxis: 'y', // Orientação horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFF' // Cor branca para os números no eixo X
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Grade do eixo X em branco translúcido
                    }
                },
                y: {
                    ticks: {
                        color: '#FFF' // Cor branca para os rótulos no eixo Y
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Grade do eixo Y em branco translúcido
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FFF', // Cor branca para o texto da legenda
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    bodyColor: '#FFF', // Cor do texto no tooltip
                    titleColor: '#FFF', // Cor do título no tooltip
                    backgroundColor: 'rgba(0, 0, 0, 0.8)' // Fundo do tooltip escuro
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    new Chart(
        document.getElementById(`myChartCanvas${idGrafico}`),
        config
    );

    
};

getDataClasses(2);

async function getDataRings(idGrafico) {
    try {
        
        const response = await fetch('/Rings');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const resposta = await response.json();
        graphic3(resposta.data, idGrafico);

    } catch (error) {
        console.error('Erro ao buscar ou plotar os dados do gráfico de anéis:', error);
    }
}

getDataRings(3);

function graphic3(resposta, idGrafico) {

    let labels = [];
    
    let dados = {
        labels: labels,
        datasets: [{
            label: '',
            data: [],
            backgroundColor: '#406C94',
            borderColor: '#406C94',
            borderWidth: 1
        }]
    };

    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];
        labels.push(registro.name); 
        dados.datasets[0].data.push(registro.qtd); 
    }
    const config = {
        type: 'bar',
        data: dados,
        options: {
            indexAxis: 'y', // Orientação horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFF' // Cor branca para os números no eixo X
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Grade do eixo X em branco translúcido
                    }
                },
                y: {
                    ticks: {
                        color: '#FFF', // Cor branca para os rótulos no eixo Y
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Grade do eixo Y em branco translúcido
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FFF' // Cor branca para o texto da legenda
                    }
                },
                tooltip: {
                    bodyColor: '#FFF', // Cor do texto no tooltip
                    titleColor: '#FFF', // Cor do título no tooltip
                    backgroundColor: 'rgba(0, 0, 0, 0.8)' // Fundo do tooltip escuro
                }
            }
        }
    };
    
    new Chart(
        document.getElementById(`myChartCanvas${idGrafico}`),
        config
    );
}

async function atualizarKPIs() {
    try {
        
        const response = await fetch('/KPI');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const resultado = await response.json();

        

        if (resultado.success) {

            document.getElementById('MostClass').innerHTML = resultado.data.mostUsedClass.class;
            document.getElementById('MostRing').innerHTML = resultado.data.mostUsedRing.name;
            document.getElementById('MostWeapon').innerHTML = resultado.data.mostUsedWeapon.name;
        } else {
            throw new Error('Erro ao obter os KPIs: resposta não foi bem-sucedida.');
        }
    } catch (error) {
        console.error('Erro ao buscar ou atualizar os KPIs:', error);

        document.getElementById('MostClass').innerHTML = 'Erro';
        document.getElementById('MostRing').innerHTML = 'Erro';
        document.getElementById('MostWeapon').innerHTML = 'Erro';
    }
}

atualizarKPIs();