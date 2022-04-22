require("dotenv").config();
const connection = process.env;

module.exports = {
  username: connection.MYSQL_USER,
  password: connection.MYSQL_PASSWORD,
  database: connection.MYSQL_DATABASE,
  host: connection.MYSQL_HOST,
  port: connection.MYSQL_PORT,
  dialect: connection.MYSQL_DIALECT,
  define: {
    timestamps: true,
  },
};
