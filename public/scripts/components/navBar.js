function navBar() {
    const scriptParent = document.currentScript.parentElement;


    scriptParent.insertAdjacentHTML("beforeend", `
        <div class="navBar">
        <div class="divLogo">
            <img src="../Assets/logo.png" alt="" class="logo">
            <span>Bonfire Memories</span>
        </div>
        <input type="text" class="searchBar" maxlength="50">
        <div class="navButtons">
            <button class="profButton userPicture" onclick="profButton()"></button>
        </div>
    </div>`);
};

function profButton(){
    window.location = "/views/profile.html"
}

navBar()

const fetchProfilePicture = async (userId) => {
    try {
        const response = await fetch(`/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        // Verifica se a resposta foi bem-sucedida e se a imagem de perfil está disponível
        if (response.ok && result.success && result.profilePicture) {
            displayProfilePicture(result.profilePicture);
        } else {
            console.log('Imagem de perfil não encontrada, usando ícone padrão.');
            displayProfilePicture('/Assets/icons/icon-user.png'); // Exibe o ícone padrão
        }
    } catch (error) {
        console.error('Erro ao buscar imagem de perfil:', error);
        // Em caso de erro, exibe o ícone padrão
        displayProfilePicture('/Assets/icons/icon-user.png');
    }
};

const displayProfilePicture = (base64String) => {
    const previewDivs = document.querySelectorAll('.userPicture');
    
    previewDivs.forEach(previewDiv => {
        previewDiv.style.backgroundImage = `url('data:image/jpeg;base64,${base64String}')`;
        previewDiv.style.backgroundSize = '100% 100%';
        previewDiv.style.backgroundPosition = 'center';
    });
};

fetchProfilePicture(sessionStorage.getItem('UserID'));