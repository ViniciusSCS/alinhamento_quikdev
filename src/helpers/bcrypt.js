const { hash, genSaltSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const salt = genSaltSync(10);

const encrypt = (senha) => {
  return hash(senha, salt);
};

const gerarTokenAccess = (body) => {
  const secret = new Date();
  const mes =
    secret.getMonth() + 1 != 9
      ? "0" + (secret.getMonth() + 1)
      : secret.getMonth() + 1;
  const dia = secret.getDate() != 9 ? secret.getDate() : "0" + secret.getDate();
  const uuid =
    secret.getFullYear() + mes + dia + Math.floor(1000 + Math.random() * 9000);
  const tokenAccess = sign({ userId: body.id }, uuid, { expiresIn: 300 });

  return tokenAccess;
};

module.exports = {
  encrypt,
  gerarTokenAccess,
};
