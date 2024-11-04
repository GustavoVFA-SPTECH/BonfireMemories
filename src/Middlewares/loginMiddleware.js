const userModel = require("../Models/userModel");
const {appError} = require("./error")


const auth_middleware = async (req, res, next) => {
    try {
        if(!auth){
            throw appError('sessão não encontrada', 401)
        }

        const auth = userModel.authenticate(req.body.login, req.body.password);
        req.auth = auth;
        next();
    } catch (error) {
        return next(error);
    }
}