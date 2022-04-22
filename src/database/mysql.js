const { Sequelize } = require("sequelize");
const config = require("../config/db");

const connectionToDatabase = new Sequelize(config);

connectionToDatabase
  .authenticate()
  .then(function () {
    console.log("Conexão com Banco de Dados realizada com sucesso!!");
  })
  .catch(function (error) {
    console.log("ERRO: Falha na conexão com Banco de Dados!!");
    console.log(error);
  });

module.exports = connectionToDatabase;
