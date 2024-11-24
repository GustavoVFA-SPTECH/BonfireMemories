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
        await postModel.newPost(title, caption, image, fkBuild || null, postOwner, type);

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

module.exports = {
    createPost,
}