function appError(message, code){
    const error = new Error(message)
    error.code = code;
    error.isTrated = true;
    
    return error;
}

function errorHandler(error, req, res, next){
    let statusCode = 500;
    let message = "Internal server error";

    if(error.isTrated){
        statusCode = error.code;
        message = error.message;
    }else{
        console.error(error);
    }

    res.status(statusCode).json({
        message: message
    });
}

module.exports = {
    appError,
    errorHandler
}