async function renderAllPosts() {
    try {
        
        const response = await fetch('/feed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os posts.');
        }

        const data = await response.json();

        if (!data.success || !data.posts) {
            console.error('Nenhum post encontrado.');
            return;
        }

        const posts = data.posts;
        const mainContainer = document.querySelector('.main');

        if (!mainContainer) {
            console.error('Contêiner principal ".main" não encontrado no DOM.');
            return;
        }

        
        mainContainer.innerHTML = '';

        
        const fetchUserProfilePicture = async (userId) => {
            try {
                const response = await fetch(`/user/${userId}`);
                
                if (!response.ok) {
                    
                    return '/Assets/icons/icon-user.png';
                }
        
                const data = await response.json();
                
                if (!data.success || !data.profilePicture) {
                    
                    return '/Assets/icons/icon-user.png';
                }
        
                
                return `data:image/jpeg;base64,${data.profilePicture}`;
            } catch (error) {
                console.error(`Erro ao buscar imagem de perfil para o usuário ${userId}:`, error);
                
                return '/Assets/icons/icon-user.png';
            }
        };
 
        for (const post of posts) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.setAttribute('onclick', `funcao(${post.idPost})`);

            
            const postBarDiv = document.createElement('div');
            postBarDiv.classList.add('postBar');

            const profilePostDiv = document.createElement('div');
            profilePostDiv.classList.add('profilePost');

            const profileImageDiv = document.createElement('div');
            profileImageDiv.classList.add('profileImage');
            profileImageDiv.id = 'postOwnerPicture';

            
            const profilePicture = await fetchUserProfilePicture(post.postOwner);

            
            profileImageDiv.style.backgroundImage = `url('${profilePicture}')`;
            profileImageDiv.style.backgroundSize = 'cover';
            profileImageDiv.style.backgroundPosition = 'center';

            const postOwnerNameSpan = document.createElement('span');
            postOwnerNameSpan.id = 'postOwnerName';
            postOwnerNameSpan.textContent = post.userName || '@Anônimo';

            profilePostDiv.appendChild(profileImageDiv);
            profilePostDiv.appendChild(postOwnerNameSpan);

            const postTitleSpan = document.createElement('span');
            postTitleSpan.classList.add('postTitle');
            postTitleSpan.id = 'postTitle';
            postTitleSpan.textContent = post.title || 'Título não disponível';

            postBarDiv.appendChild(profilePostDiv);
            postBarDiv.appendChild(postTitleSpan);

            
            const postBoxDiv = document.createElement('div');
            postBoxDiv.classList.add('postBox');

            const postContentDiv = document.createElement('div');
            postContentDiv.classList.add('postContent');

            const postTextSpan = document.createElement('span');
            postTextSpan.classList.add('postText');
            postTextSpan.id = 'postCaption';
            postTextSpan.textContent = post.caption || 'Sem descrição';

            const postImageDiv = document.createElement('div');
            postImageDiv.classList.add('postImage');
            postImageDiv.id = 'postImage';
            postImageDiv.style.backgroundImage = post.postImage
                ? `url('data:image/jpeg;base64,${post.postImage}')`
                : `url('/Assets/defaultImage.jpg')`;
            postImageDiv.style.backgroundSize = 'cover';
            postImageDiv.style.backgroundPosition = 'center';

            postContentDiv.appendChild(postTextSpan);
            postContentDiv.appendChild(postImageDiv);

            postBoxDiv.appendChild(postContentDiv);

            
            postDiv.appendChild(postBarDiv);
            postDiv.appendChild(postBoxDiv);

            
            mainContainer.appendChild(postDiv);
        }
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        alert('Ocorreu um erro ao carregar os posts.');
    }
}


document.addEventListener('DOMContentLoaded', renderAllPosts);

function funcao(idPost) {
    console.log("Clique captado",idPost)
}
