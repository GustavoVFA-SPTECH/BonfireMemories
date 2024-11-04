const alreadyLoginMiddleware = async (req, res, next) => {
    try {
        if (req.auth) {
            throw appError('Já está logado', 401);
        }
        next();
    } catch (error) {
        next(error);
    }
}