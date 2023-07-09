'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StatusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      DoctorId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PatientId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY
      },
      timeType: {
        type: Sequelize.INTEGER
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
    .then(() => queryInterface.addConstraint('Bookings', {
      type: 'FOREIGN KEY',
      name: 'bookings_ibfk_patients', // useful if using queryInterface.removeConstraint
      fields: ['PatientId'], 
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('Bookings', {
      type: 'FOREIGN KEY',
      name: 'bookings_ibfk_allcodes_status', // useful if using queryInterface.removeConstraint
      fields: ['StatusId'], 
      references: {
        table: 'Allcodes',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('Bookings', {
      type: 'FOREIGN KEY',
      name: 'bookings_ibfk_allcodes_timeType', // useful if using queryInterface.removeConstraint
      fields: ['timeType'], 
      references: {
        table: 'Allcodes',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('bookings', {
      type: 'FOREIGN KEY',
      name: 'bookings_ibfk_doctors', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable('Bookings');
  }
};