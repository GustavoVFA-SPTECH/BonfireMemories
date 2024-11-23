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