'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      images.belongsTo(models.diaries,{
        foreignKey:"diary_id",
      })
    }
  }
  images.init({
    diary_id: DataTypes.INTEGER,
    imageurl: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    sequelize,
    modelName: 'images',
  });
  return images;
};