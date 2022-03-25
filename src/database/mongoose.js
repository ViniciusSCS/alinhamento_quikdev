const mongoose = require("mongoose");
const connect = process.env;

function connectToDatabase() {
  mongoose.connect(connect.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", () => console.error("Falha ao conectar ao Banco de Dados"));
  db.once("open", () => console.log("Conectado ao Banco de Dados"));
}

module.exports = connectToDatabase;
