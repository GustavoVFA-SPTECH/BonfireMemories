async function getDataWeapons(idGrafico) {
    try {
        console.log('Buscando dados da rota de armas...');

        
        const response = await fetch('/weapons');
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        
        const resposta = await response.json();

        console.log('Dados recebidos da API de armas:');
        console.log(resposta);

        
        graphic1(resposta.data, idGrafico);

    } catch (error) {
        console.error('Erro ao buscar ou plotar os dados do gráfico de armas:', error);
    }
}

function graphic1(resposta, idGrafico) {
    console.log('Iniciando plotagem do gráfico de armas...');

    
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

    console.log('Gráfico plotado com sucesso!');
}

getDataWeapons(1);

async function getDataClasses(idGrafico) {
    try {
        console.log('Buscando dados da rota de classes...');

        const response = await fetch('/classes');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const resposta = await response.json();

        console.log('Dados recebidos da API de classes:');
        console.log(resposta);

        graphic2(resposta.data, idGrafico);

    } catch (error) {
        console.error('Erro ao buscar ou plotar os dados do gráfico de classes:', error);
    }
};

function graphic2(resposta, idGrafico) {
    console.log('Iniciando plotagem do gráfico de classes...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
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

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];
        labels.push(registro.class); // Nome da classe
        dados.datasets[0].data.push(registro.qtd); // Quantidade de builds
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

    console.log('Gráfico de classes plotado com sucesso!');
};

getDataClasses(2);
