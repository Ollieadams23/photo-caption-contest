'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // An image can have many captions
      Image.hasMany(models.Caption, { foreignKey: 'imageId', as: 'captions' });
    }
      // define association here
      Image.hasMany(models.Caption, { foreignKey: 'imageId', as: 'captions' });
    url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};