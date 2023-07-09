'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.History.belongsTo(models.Doctor,{foreignKey: 'DoctorId', targetKey: 'id'});

      models.History.belongsTo(models.Patient,{foreignKey: 'PatientId', targetKey: 'id'});

      models.History.belongsTo(models.Booking,{foreignKey: 'BookingId', targetKey: 'id'});
    }
  }
  History.init({
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    BookingId: DataTypes.INTEGER,
    History_description: DataTypes.TEXT,
    History_files: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};