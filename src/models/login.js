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
      models.Login.belongsTo(models.Doctor,{foreignKey: 'DoctorId', targetKey: 'id'});

      models.Login.belongsTo(models.Patient,{foreignKey: 'PatientId', targetKey: 'id'});
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