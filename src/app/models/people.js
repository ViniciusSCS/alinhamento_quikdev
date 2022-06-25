'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate (models) {
      People.belongsTo(models.profile)
    }
  }
  People.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      profileId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'people',
      tableName: 'peoples'
    }
  )
  return People
}
