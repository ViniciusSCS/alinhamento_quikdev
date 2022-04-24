"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profiles.hasOne(models.people);
    }
  }
  Profiles.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "profile",
      tableName: "profiles",
    }
  );
  return Profiles;
};
