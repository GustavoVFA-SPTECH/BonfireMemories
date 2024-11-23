const userModel = require("../Models/userModel.js")
const userDto = require("../dtos/userDto.js")
const {appError} = require("../Middlewares/error.js")

const createUser = async (req, res, next) => {
    const body = req.body;

    try {     
        const dto = userDto.createDto(body);
        if (dto.length > 0) {
            throw appError(dto, 400);  
        }
        await userModel.register(body.userName, body.email, body.password);
        
        res.json({
            message: 'Usuário registrado com sucesso',
        });
    } catch (error) {
        
        return next(error);
    }
}

const getBuildCountController = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'O userId é obrigatório.',
            });
        }

        const buildCount = await userModel.getBuildCount(userId);

        return res.status(200).json({
            success: true,
            data: {
                buildCount: buildCount.count,
            },
        });
    } catch (error) {
        console.error('Erro ao obter a contagem de builds:', error);

        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao buscar a contagem de builds.',
            error: error.message,
        });
    }
};

const getPostCountController = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'O userId é obrigatório.',
            });
        }

        const postCount = await userModel.getPostCount(userId);

        return res.status(200).json({
            success: true,
            data: {
                postCount: postCount.count,
            },
        });
    } catch (error) {
        console.error('Erro ao obter a contagem de posts:', error);

        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao buscar a contagem de posts.',
            error: error.message,
        });
    }
};

const getUserPictureController = async (req, res) => {
    const { idUser } = req.params;

    try {
        const userPicture = await getUserPicture(idUser);

        if (userPicture && userPicture.profilePicture) {
            res.status(200).json({
                success: true,
                profilePicture: userPicture.profilePicture,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Imagem de perfil não encontrada para este usuário.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao buscar a imagem de perfil.',
            error: error.message,
        });
    }
};


module.exports = {
    createUser,
    getBuildCountController,
    getPostCountController,
    getUserPictureController
}