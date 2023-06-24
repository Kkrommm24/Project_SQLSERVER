'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Doctor_email: {
        type: Sequelize.STRING
      },
      ClinicId: {
        type: Sequelize.INTEGER
      },
      SpecializationId: {
        type: Sequelize.INTEGER
      },
      roleId:{
        type: Sequelize.STRING
      },
      Doctor_firstName: {
        type: Sequelize.STRING
      },
      Doctor_lastName: {
        type: Sequelize.STRING
      },
      Doctor_address: {
        type: Sequelize.STRING
      },
      Doctor_gender: {
        type: Sequelize.INTEGER
      },
      Doctor_age: {
        type: Sequelize.INTEGER
      },
      Doctor_phoneNumber: {
        type: Sequelize.STRING
      },
      Doctor_image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Doctors');
  }
};