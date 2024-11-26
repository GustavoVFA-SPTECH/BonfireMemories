const postModel = require("../Models/postModel.js");

const createPost = async (req, res) => {
    const { title, caption, image, fkBuild, postOwner, type } = req.body;

    if (!title || !caption || !image || !postOwner || !type) {
        return res.status(400).json({
            success: false,
            message: 'Campos obrigatórios estão faltando. Certifique-se de fornecer title, caption, image, postOwner e type.',
        });
    }

    try {
        await postModel.newPost(title, caption, image, fkBuild, postOwner, type);

        res.status(201).json({
            success: true,
            message: 'Post criado com sucesso!',
        });
    } catch (error) {
        console.error('Erro ao criar o post:', error);
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao criar o post.',
            error: error.message,
        });
    }
};

const getPostById = async (req, res) => {
    const { idPost } = req.params; 

    try {
        
        const post = await postModel.getPostById(idPost);

        if (post && post.length > 0) {
            res.status(200).json({
                success: true,
                post: post[0], 
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Post não encontrado.',
            });
        }
    } catch (error) {
        console.error('Erro ao buscar o post:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar o post.',
            error: error.message,
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getPosts(); 

        if (Array.isArray(posts) && posts.length > 0) {
            res.status(200).json({
                success: true,
                posts,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhum post encontrado.',
            });
        }
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao buscar os posts.',
            error: error.message,
        });
    }
};

module.exports = {
    createPost,
    getPostById,
    getAllPosts,
}