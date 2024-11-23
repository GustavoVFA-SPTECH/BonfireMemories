function editModal() {
    const scriptParent = document.currentScript.parentElement;
  
    scriptParent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="editModal">
        <div class="editMain">
            <span class="editTitle">Edit Profile</span>
            <div class="previewProfilePicture userPicture"></div>
                <label for="iptProfilePicture" class="labelPicture"></label>
                <input type="file" id="iptProfilePicture">
                <input type="text" id="editEmail">
                <input placeholder="Current password" type="password" id="currentPassword">
                <input placeholder="New password" type="password" id="newPassword">
            <div class="buttonsDiv">
                <button class="buttonEdit" onclick="backButton()">Back</button>
                <button class="buttonEdit" onclick="saveChanges()">Save</button>
            </div>
        </div>
      </div>
         `
    );
}
editModal();

function backButton(){
    const editModal = document.querySelector(".editModal");
    editModal.style.display = 'none';
}

function openEdit(){
    const editModal = document.querySelector(".editModal");
    editModal.style.display = 'flex';
}

document.getElementById('iptProfilePicture').addEventListener('change', function(event) {
    const fileInput = event.target;
    const previewDiv = document.querySelector('.previewProfilePicture');

    previewDiv.style.backgroundImage = '';

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                previewDiv.style.backgroundImage = `url('${e.target.result}')`;
                previewDiv.style.backgroundSize = '100% 100%';
                previewDiv.style.backgroundPosition = 'center';
            };

            reader.readAsDataURL(file);
        } else {
            previewDiv.textContent = 'Por favor, selecione um arquivo de imagem.';
        }
    }
});

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); 
    });
};

const saveChanges = async () => {
    const userId = sessionStorage.getItem('UserID'); 

    if (!userId) {
        console.error('User ID não encontrado na sessionStorage.');
        return;
    }

    const profilePictureFile = document.getElementById('iptProfilePicture').files[0];
    const email = document.getElementById('editEmail').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    let profilePictureBase64 = null;

    if (profilePictureFile) {
        profilePictureBase64 = await convertToBase64(profilePictureFile);
    }

    const payload = {
        idUser: userId,
        profilePicture: profilePictureBase64 || null,
        email: email || null,
        password: currentPassword || null,
        newPassword: newPassword || null,
    };

    try {       
        const response = await fetch('/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Dados atualizados com sucesso:', result.message);
            alert('Dados atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar dados:', result.message);
            alert(`Erro: ${result.message}`);
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error);
        alert(`Erro inesperado: ${error.message}`);
    }
};

const email = document.getElementById('editEmail');
email.value = sessionStorage.getItem('email');


