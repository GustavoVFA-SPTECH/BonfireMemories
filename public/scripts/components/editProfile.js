function editModal() {
    const scriptParent = document.currentScript.parentElement;
  
    scriptParent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="editModal">
        <div class="editMain">
            <span class="editTitle">Edit Profile</span>
            <div class="previewProfilePicture"></div>
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

const email = document.getElementById('editEmail');
email.value = sessionStorage.getItem('email');