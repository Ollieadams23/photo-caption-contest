'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Each caption belongs to a user
      Caption.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      // Each caption belongs to an image
      Caption.belongsTo(models.Image, { foreignKey: 'imageId', as: 'image' });
    }
  }
  Caption.init({
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caption',
  });
  return Caption;
};