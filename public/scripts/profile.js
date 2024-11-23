function checkTokenAndRedirect(redirectUrl) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = redirectUrl;
    }
  }
  
  checkTokenAndRedirect('/views/homePage.html');

const userName = document.getElementById('userName');
const userId = sessionStorage.getItem('UserID');

userName.innerHTML = sessionStorage.getItem('userName');
atualizarBuildCount(userId);
atualizarPostCount(userId);

function logout(){
    sessionStorage.clear()
    window.location.reload()
}

async function atualizarBuildCount(userId) {
    try {
        const response = await fetch(`/buildCount/${userId}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const resultado = await response.json();


        if (resultado.success) {
            document.getElementById('buildCount').innerHTML = resultado.data.buildCount;
        } else {
            throw new Error('Erro ao obter a contagem de builds: resposta não foi bem-sucedida.');
        }
    } catch (error) {
        document.getElementById('buildCount').innerHTML = 'Erro';
    }
}

async function atualizarPostCount(userId) {
    try {
        const response = await fetch(`/postCount/${userId}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const resultado = await response.json();


        if (resultado.success) {
            document.getElementById('postCount').innerHTML = resultado.data.postCount;
        } else {
            throw new Error('Erro ao obter a contagem de posts: resposta não foi bem-sucedida.');
        }
    } catch (error) {
        document.getElementById('postCount').innerHTML = 'Erro';
    }
}

