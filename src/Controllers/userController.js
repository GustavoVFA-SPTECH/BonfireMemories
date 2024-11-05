const userModel = require("../Models/userModel.js")
const userDto = require("../dtos/userDto.js")
const {appError} = require("../Middlewares/error.js")

const createUser = async (req, res, next)=>{
    const body = req.body;

    try {
        const dto = userDto.createDto(body);
        if (dto.length > 0) {
            throw appError(dto, 400);
        }
        const user = await userModel.register(body.userName, body.email, body.password);
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    createUser,
}