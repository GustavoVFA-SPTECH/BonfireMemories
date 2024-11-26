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

        if (response.ok && result.success && result.profilePicture) {
            displayProfilePicture(result.profilePicture);
        } else{
            displayProfilePicture('/Assets/icons/icon-user.png'); 
            console.log('Imagem de perfil não encontrada, usando ícone padrão.');
        }
    } catch (error) {
        console.error('Erro ao buscar imagem de perfil:', error);        
        displayProfilePicture('/Assets/icons/icon-user.png');
    }
};

fetchProfilePicture(sessionStorage.getItem('UserID'));


const displayProfilePicture = (base64String) => {
    const previewDivs = document.querySelectorAll('.userPicture');
    console.log(base64String)

    if(base64String == '/Assets/icons/icon-user.png'){
        previewDivs.forEach(previewDiv => {
            previewDiv.style.backgroundImage = `url('${base64String}')`;
        });
    }else{
        previewDivs.forEach(previewDiv => {
            previewDiv.style.backgroundImage = `url('data:image/jpeg;base64,${base64String}')`;
            previewDiv.style.backgroundSize = '100% 100%';
            previewDiv.style.backgroundPosition = 'center';
        });
    }
    
};
