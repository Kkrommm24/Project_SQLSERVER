'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId:{
        type: Sequelize.STRING
      },
      Patient_email: {
        type: Sequelize.STRING
      },
      Patient_firstName: {
        type: Sequelize.STRING
      },
      Patient_lastName: {
        type: Sequelize.STRING
      },
      Patient_address: {
        type: Sequelize.STRING
      },
      Patient_gender: {
        type: Sequelize.INTEGER
      },
      Patient_age: {
        type: Sequelize.INTEGER
      },
      Patient_phoneNumber: {
        type: Sequelize.STRING
      },
      Patient_image: {
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
    await queryInterface.dropTable('Patients');
  }
};