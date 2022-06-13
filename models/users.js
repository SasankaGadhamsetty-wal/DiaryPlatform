'use strict';
const {
  Model
} = require('sequelize');
const diaries = require('./diaries');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.diaries,{
        foreignKey:"email"
      });
      users.hasMany(models.credentials,{
        foreignKey:"email"
      })
    }
  }
  users.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};

