"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      diaries.belongsTo(models.users, {
        foreignKey: "email",
      });
    }
  }
  diaries.init(
    {
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "diaries",
    }
  );
  return diaries;
};
