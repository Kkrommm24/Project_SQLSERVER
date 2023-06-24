'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Registration.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    User_firstName: DataTypes.STRING,
    User_lastName: DataTypes.STRING,
    User_address: DataTypes.STRING,
    User_age: DataTypes.INTEGER,
    User_phoneNumber: DataTypes.STRING,
    User_gender: DataTypes.INTEGER,
    User_image: DataTypes.STRING,
    roleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};