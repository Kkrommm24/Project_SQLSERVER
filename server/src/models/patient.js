'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Patient.hasOne(models.Login,{foreignKey: 'email', targetKey: 'email'});

      models.Patient.belongsTo(models.Allcode,{foreignKey: 'Patient_gender', targetKey: 'id'});
    }
  }
  Patient.init({
    roleId: DataTypes.STRING,
    email: DataTypes.STRING,
    Patient_firstName: DataTypes.STRING,
    Patient_lastName: DataTypes.STRING,
    Patient_address: DataTypes.STRING,
    Patient_age: DataTypes.INTEGER,
    Patient_phoneNumber: DataTypes.STRING,
    Patient_gender: DataTypes.INTEGER,
    Patient_image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};