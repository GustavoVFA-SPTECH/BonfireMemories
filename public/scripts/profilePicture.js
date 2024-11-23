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
        } else {
            console.log('Imagem de perfil não encontrada:', result.message);
        }
    } catch (error) {
        console.error('Erro ao buscar imagem de perfil:', error);
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