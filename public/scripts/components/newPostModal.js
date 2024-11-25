function modalNewPost() {
    const scriptParent = document.currentScript.parentElement;
  
    scriptParent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modalNewPost">
        <div class="newPostMain">
            <span class="newPostTitle">New Post</span>
            <div class="topDivNewPost">
                <div class="postInputs">
                    <input placeholder="Title" class="postInput" id="postTitle"/>
                    <select class="postInput" id="postType">
                        <option disabled selected value="#">Post type</option>
                        <option value="build">Build</option>
                        <option value="curiosity">Curiosity</option>
                    </select>
                    <select class="postInput" id="postBuild">
                        <option disabled selected value="#">Select a build</option>
                    </select>
                </div>
                <textarea placeholder="Post content" maxlength="255" id="postCaption" class="textAreaPost"></textarea>
            </div>
            <div class="bottomDivNewPost">
                <div class="previewPostImage">
                    <label for="iptPostImage">Upload image here</label>
                    <input id="iptPostImage" type="file">
                </div>
            </div>
            <div class="buttonsNewPost">
                <button class="postButton" onclick="closePost()">Back</button>
                <button class="postButton" id="postButton">Post</button>
            </div>
        </div>
      </div>
         `
    );
}

modalNewPost();

function closePost() {
    const modalNewPost = document.querySelector(".modalNewPost");
    modalNewPost.style.display = "none";
}

async function createPost() {
    try {
        
        const titleInput = document.getElementById('postTitle');
        const typeSelect = document.getElementById('postType');
        const buildSelect = document.getElementById('postBuild');
        const captionTextarea = document.getElementById('postCaption');
        const imageInput = document.getElementById('iptPostImage');
       
        const title = titleInput.value.trim();
        const type = typeSelect.value;
        const fkBuild = buildSelect.value === '#' ? null : buildSelect.value;
        const caption = captionTextarea.value.trim();
        
        console.log(fkBuild);
        
        if (!title || !type || type === '#' || !caption) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
     
        let image = null;
        if (imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            image = await toBase64(file);
        }
        
        const payload = {
            title,
            caption,
            image,
            fkBuild,
            postOwner: sessionStorage.getItem('UserID'), 
            type,
        };
       
        const response = await fetch('/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Post criado com sucesso!');
            
        } else {
            console.error('Erro ao criar post:', data.message);
            alert(`Erro ao criar post: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao criar o post.');
    }
}

function previewImage() {
    const imageInput = document.getElementById('iptPostImage');
    const previewDiv = document.querySelector('.previewPostImage');

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            previewDiv.style.backgroundImage = `url('${e.target.result}')`;
            previewDiv.style.backgroundSize = '100% 100%';
            previewDiv.style.backgroundPosition = 'center';
        };

        reader.readAsDataURL(file);
    };
};

document.getElementById('iptPostImage').addEventListener('change', previewImage);

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

document.getElementById('postButton').addEventListener('click', createPost);


async function loadUserBuilds() {
    try {
        const userID = sessionStorage.getItem('UserID');
        if (!userID) {
            console.error('ID do usuário não encontrado no sessionStorage.');
            return;
        }

        const response = await fetch(`/load?userID=${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar builds do usuário.');
        }

        const builds = await response.json();

        const buildSelect = document.getElementById('postBuild');
        buildSelect.innerHTML = '<option disabled selected value="#">Select a build</option>'; 

        builds.forEach((build) => {
            const option = document.createElement('option');
            option.value = build.idBuild;
            option.textContent = build.name;
            buildSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar builds do usuário:', error);
        alert('Ocorreu um erro ao carregar as builds do usuário.');
    }
}


document.addEventListener('DOMContentLoaded', loadUserBuilds);