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
      Doctor.hasMany(History, {
        foreignKey: 'DoctorId'
      });
      History.belongsTo(Doctor);

      Patient.hasMany(History, {
        foreignKey: 'PatientId'
      });
      History.belongsTo(Patient);

      Booking.hasOne(History, {
        foreignKey: 'BookingId'
      });
      History.belongsTo(Booking);
    }
  }
  History.init({
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    BookingId: DataTypes.INTEGER,
    History_description: DataTypes.TEXT,
    History_files: DataTypes.TEXT,
    files: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};