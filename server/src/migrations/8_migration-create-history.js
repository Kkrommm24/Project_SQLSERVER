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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('Histories', {
      type: 'FOREIGN KEY',
      name: 'histories_ibfk_patients', // useful if using queryInterface.removeConstraint
      fields: ['PatientId'], 
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('Histories', {
      type: 'FOREIGN KEY',
      name: 'histories_ibfk_bookings', // useful if using queryInterface.removeConstraint
      fields: ['BookingId'], 
      references: {
        table: 'Bookings',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('Histories', {
      type: 'FOREIGN KEY',
      name: 'histories_ibfk_doctors', // useful if using queryInterface.removeConstraint
      fields: ['DoctorId'], 
      references: {
        table: 'Doctors',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};