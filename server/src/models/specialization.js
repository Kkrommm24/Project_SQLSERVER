'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specialization.init({
    Specialization_name: DataTypes.STRING,
    Specialization_description: DataTypes.TEXT,
    Specialization_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialization',
  });
  return Specialization;
};