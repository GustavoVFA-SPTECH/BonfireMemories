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


async function loadUserPosts() {
    try {
        const userID = sessionStorage.getItem('UserID'); 

        if (!userID) {
            console.error('ID do usuário não encontrado no sessionStorage.');
            return;
        }
      
        const response = await fetch(`/userPosts/${userID}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os posts do usuário.');
        }

        const data = await response.json();

        if (!data.success || !data.posts) {
            console.error('Nenhum post encontrado para este usuário.');
            return;
        }
       
        const posts = data.posts;
        const postsContainer = document.querySelector('.profilePost');
        postsContainer.innerHTML = '';

        posts.forEach((post) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('profilePost');

            const postPreviewDiv = document.createElement('div');
            postPreviewDiv.classList.add('postPreview');

            const postContentDiv = document.createElement('div');
            postContentDiv.classList.add('postContent');

            const postTitleSpan = document.createElement('span');
            postTitleSpan.classList.add('postTitle');
            postTitleSpan.textContent = post.title;

            const postImage = document.createElement('img');
            postImage.classList.add('postImage');
            postImage.src = post.postImage ? `data:image/jpeg;base64,${post.postImage}` : '/Assets/defaultImage.jpg';
            postImage.alt = 'Post Image';

            postContentDiv.appendChild(postTitleSpan);
            postPreviewDiv.appendChild(postContentDiv);
            postPreviewDiv.appendChild(postImage);
            postDiv.appendChild(postPreviewDiv);

            postsContainer.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar os posts do usuário:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadUserPosts);





