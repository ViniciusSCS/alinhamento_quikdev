"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate() {}
  }
  People.init(
    {
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "people",
      tableName: "peoples",
    }
  );
  return People;
};
