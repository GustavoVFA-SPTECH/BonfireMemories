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

const updateUserData = async (req, res) => {
    const { idUser, profilePicture, email, password, newPassword } = req.body;

    try {
        if (profilePicture !== null && profilePicture !== undefined) {
            const pictureResult = await updatePicture(idUser, profilePicture);
            if (pictureResult instanceof Error) {
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar a imagem de perfil.',
                    error: pictureResult.message
                });
            }
        }

        if (email !== null && email !== undefined) {
            const emailResult = await updateEmail(idUser, email);
            if (emailResult instanceof Error) {
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar o email.',
                    error: emailResult.message
                });
            }
        }

        if (password !== null && password !== undefined && newPassword !== null && newPassword !== undefined) {
            const passwordResult = await updatePassword(idUser, password, newPassword);
            if (passwordResult instanceof Error) {
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar a senha.',
                    error: passwordResult.message
                });
            } else if (passwordResult === false) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha atual inválida.'
                });
            }
        }

        res.status(200).json({
            success: true,
            message: 'Dados do usuário atualizados com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao atualizar os dados do usuário.',
            error: error.message
        });
    }
};


module.exports = {
    createUser,
    getBuildCountController,
    getPostCountController,
    getUserPictureController,
    updateUserData
}