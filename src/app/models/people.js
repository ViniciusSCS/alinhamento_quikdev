"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  People.init(
    {
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "People",
    }
  );
  return People;
};
