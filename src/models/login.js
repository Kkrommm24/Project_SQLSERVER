'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.hasMany(Login, {
        foreignKey: 'email'
      });
      Login.belongsTo(Doctor);

      Patient.hasMany(Login, {
        foreignKey: 'email'
      });
      Login.belongsTo(Patient);
    }
  }
  Login.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};