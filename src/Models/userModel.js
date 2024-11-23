const bcrypt  = require("bcrypt");
const database = require("../Database/config");
const crypto = require("crypto-js");

async function authenticate(login, loginPassword){
    const [dbResult] = await database.executar(`SELECT idUser, userName, email, password FROM User WHERE (email = ? OR userName = ?);`,
        [login, login])
    if(!dbResult){
        return false;
    }
    const password = await bcrypt.compare(loginPassword, dbResult.password)
        console.log(login, loginPassword)
    if(!password){
        return false;
    }else{
        const token = crypto.AES.encrypt(JSON.stringify({
            idUser: dbResult.idUser,
            userName: dbResult.userName,
            email: dbResult.email
        }), process.env.SECRET_KEY).toString();

        return {
            userName: dbResult.userName,
            email: dbResult.email,
            token,
            idUser: dbResult.idUser
        };
    }
};

async function register(userName, email, password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw appError("Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.", 400);
    }
  
    const existingUser = await database.executar(`
      SELECT idUser FROM User WHERE email = ? OR userName = ?;
    `, [email, userName]);
  
    if (existingUser && existingUser.length > 0) {
      throw appError("Email ou nome de usuário já estão em uso", 400);
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await database.executar(`
      INSERT INTO User (userName, email, password) VALUES (?, ?, ?);
    `, [userName, email, hashedPassword]);
  }

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

const getBuildCount = async (userId) => {
    try {
        const [buildCount] = await database.executar(`SELECT COUNT(*) as count FROM Build WHERE buildOwner = ?;`, [userId]); 
        return buildCount;
    } catch (error) {
        return error;
    }
}

module.exports = {
    authenticate,
    register,
    getByID,
    getByEmail,
    getByUserName,
    getBuildCount
};
