'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registrations', {
      RegistrationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.STRING
      },
      User_firstName: {
        type: Sequelize.STRING
      },
      User_lastName: {
        type: Sequelize.STRING
      },
      User_address: {
        type: Sequelize.STRING
      },
      User_gender: {
        type: Sequelize.INTEGER
      },
      User_age: {
        type: Sequelize.INTEGER
      },
      User_phoneNumber: {
        type: Sequelize.STRING
      },
      User_image: {
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
    await queryInterface.dropTable('Registrations');
  }
};