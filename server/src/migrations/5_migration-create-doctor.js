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
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      ClinicId: {
        type: Sequelize.INTEGER,
      },
      SpecializationId: {
        type: Sequelize.INTEGER,
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
        allowNull: false,
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
      },
    })
    .then(() => queryInterface.addConstraint('doctors', {
      type: 'FOREIGN KEY',
      name: 'doctors_ibfk_clinics', // useful if using queryInterface.removeConstraint
      fields: ['ClinicId'], 
      references: {
        table: 'Clinics',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('doctors', {
      type: 'FOREIGN KEY',
      name: 'doctors_ibfk_specializations', // useful if using queryInterface.removeConstraint
      fields: ['SpecializationId'], 
      references: {
        table: 'Specializations',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('doctors', {
      type: 'FOREIGN KEY',
      name: 'doctors_ibfk_logins', // useful if using queryInterface.removeConstraint
      fields: ['email'], 
      references: {
        table: 'Logins',
        field: 'email',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('doctors', {
      type: 'FOREIGN KEY',
      name: 'doctors_ibfk_allcodes', // useful if using queryInterface.removeConstraint
      fields: ['Doctor_gender'], 
      references: {
        table: 'Allcodes',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Doctors');
  }
};