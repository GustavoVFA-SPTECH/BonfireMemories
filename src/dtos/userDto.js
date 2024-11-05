const createDto = ({userName, email, password}) => {
    const errors = [];

    if (!userName || !email || !password) {
        errors.push('The fields "name", "email" and "password" are required');
    }else if( typeof email !== "string"){
        errors.push('the email needs to be string');
    }else if( typeof userName !== "string"){
        errors.push('the name needs to be string');
    }else if(typeof password !== "string"){
        errors.push('the password needs to be string');
    }
    
    
    else{
        if (email.length > 60) {
            errors.push('The email must contain a maximum of 80 characters');
        };

        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            errors.push('The email format is invalid')
        };

        if (userName.length > 45) {
            errors.push('The name must contain a maximum of 45 characters');
        };
        
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$#!%*?&]{8,30}$/)) { // 1 minus 1 maius 1 num 1 esp min 8 max 30
            errors.push('The password format is invalid');
        };
    };

    return errors;
}


module.exports = {
    createDto
}