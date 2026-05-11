'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A user can have many captions
      User.hasMany(models.Caption, { foreignKey: 'userId', as: 'captions' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};