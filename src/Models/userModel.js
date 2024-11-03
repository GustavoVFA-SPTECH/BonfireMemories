const bcrypt  = require("bcrypt");
const database = require("../Database/config");

async function authenticate(login, password){
    const [dbResult] = await database.executar(`SELECT idUser, userName, email FROM User WHERE (email = ? OR userName = ?);`,
        [login, login])
    
    const password = await bcrypt.compare(password, dbResult.password)
};

async function register(userName, email, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    database.executar(`INSERT INTO User (userName, email, password) VALUES (?, ?, ?);`,
         [userName, email, hashedPassword])
};


const getByID = async (idUser) => {
    try {
        const [user] = await database.executar(`SELECT * FROM User WHERE idUser = ?;`,
            [idUser]);

        return user;
    } catch (error) {
        return error;
    }
}

const getByEmail = async (email) => {
    try {
        const [user] = await database.executar(`SELECT * FROM User WHERE email =?;`,
            [email]);

        return user;
    } catch (error) {
        return error;
    }
}


const getByUserName = async (userName) => {
    try {
        const [user] = await database.executar(`SELECT * FROM User WHERE userName =?;`,
            [userName]);
            
        return user;
    } catch (error) {
        return error;
    }
}

module.exports = {
    authenticate,
    register,
    getByID,
    getByEmail,
    getByUserName
};
