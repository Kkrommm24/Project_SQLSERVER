'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    static associate(models) {
      this.belongsTo(models.Specialty, { foreignKey: 'SpecialtyId' });
    }
  };
  Clinic.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    slug: DataTypes.STRING,
    SpecialtyId: DataTypes.INTEGER, 
    introduction: DataTypes.STRING,
    specialty: DataTypes.STRING,
    doctors: DataTypes.STRING,
    booking: DataTypes.STRING,
    location: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};
