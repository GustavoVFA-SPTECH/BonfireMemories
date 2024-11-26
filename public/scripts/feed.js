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
        
        const fetchUserName = async (userId) => {
            try {
                const response = await fetch(`/userName/${userId}`);
                
                if (!response.ok) {
                    return '@Anônimo';
                }
                const data = await response.json();
                
                if (!data.success || !data.userName) {
                    return '@Anônimo';
                }

                return `@${data.userName}`;  
            } catch (error) {
                console.error(`Erro ao buscar nome de usuário para o id ${userId}:`, error);
                return '@Anônimo';
            }
        };

        
        for (const post of posts) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.setAttribute('onclick', `openPost(${post.idPost})`);
            
            const postBarDiv = document.createElement('div');
            postBarDiv.classList.add('postBar');

            const profilePostDiv = document.createElement('div');
            profilePostDiv.classList.add('profilePost');

            const profileImageDiv = document.createElement('div');
            profileImageDiv.classList.add('profileImage');
            profileImageDiv.id = 'postOwnerPicture';         
            
            const profilePicture = await fetchUserProfilePicture(post.postOwner);
            profileImageDiv.style.backgroundImage = `url('${profilePicture}')`;
            
            
            
            const postOwnerName = await fetchUserName(post.postOwner);
            const postOwnerNameSpan = document.createElement('span');
            postOwnerNameSpan.id = 'postOwnerName';
            postOwnerNameSpan.textContent = postOwnerName;

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

async function openPost(idPost) {
    const OpenmodalPost = document.querySelector(".OpenmodalPost");
    OpenmodalPost.style.display = "flex";

    try {      
        const response = await fetch(`/post/${idPost}`);

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados do post.');
        }

        const data = await response.json();

        if (data.success && data.post) {
            const post = data.post;

            console.log(post.caption)
  
            document.getElementById('OpenPostTitle').textContent = post.title || 'Título não disponível';
            document.getElementById('OpenPostCaption').value = post.caption || 'Sem descrição';

            const previewOpenPostImage = document.getElementById('OpenPostImage');
            if (post.postImage) {
                previewOpenPostImage.style.backgroundImage = `url('data:image/jpeg;base64,${post.postImage}')`;
            } else {
                previewOpenPostImage.style.backgroundImage = `url('/Assets/defaultImage.jpg')`;
            }
            const buildCase = document.querySelector('.BuildCase')
            const buildLink = document.querySelector('.OpenPostBuildName');
            buildCase.style.display = "none";
            if (post.fkBuild) {
                const buildResponse = await fetch(`/buildName/${post.fkBuild}`);
                if (!buildResponse.ok) {
                    throw new Error('Erro ao carregar os dados da build.');
                }

                const buildData = await buildResponse.json();
                if (buildData.success && buildData.build) {
                    buildCase.style.display = "block";
                    buildLink.innerHTML = buildData.build.name || 'Default Build';
                    buildLink.href = `buildCalculator.html?buildId=${post.fkBuild}`;
                } else {
                    buildLink.innerHTML = 'Build não encontrada';
                }
            }
                

        } else {
            console.error('Post não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar o post:', error);
    }
}

