'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      DoctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      BookingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      History_description: {
        type: Sequelize.TEXT
      },
      History_files: {
        type: Sequelize.TEXT
      },
      History_createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      History_updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};