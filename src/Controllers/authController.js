const userModel = require("../Models/userModel.js");
const { appError } = require("../Middlewares/error.js");

async function login(req, res, next) {
  const body = req.body;
  try {
    const auth = await userModel.authenticate(body.login, body.password);
    if(!auth){
      throw appError("Incorrect Password or Login", 400);
    }
    res.json(auth);
    console.log(auth)
  } catch (error) {
    return next(error);
  }
}

function logout(req, res, next) {
  try {
  } catch (error) {
    return next(error);
  }
}

const decryptTokenController = async (req, res) => {
  try {
      const { token } = req.body; 
      const secretKey = process.env.SECRET_KEY; 

      if (!token) {
          return res.status(400).json({ message: 'Token é obrigatório.' });
      }

      const bytes = crypto.AES.decrypt(token, secretKey);
      const decryptedData = bytes.toString(crypto.enc.Utf8);      
      const userData = JSON.parse(decryptedData);

      return res.status(200).json({
          message: 'Token descriptografado com sucesso.',
          data: userData,
      });
  } catch (error) {
      console.error('Erro ao descriptografar o token:', error);
      return res.status(500).json({
          message: 'Erro ao processar o token.',
          error: error.message,
      });
  }
};

module.exports = {
  login,
  logout,
  decryptTokenController
};