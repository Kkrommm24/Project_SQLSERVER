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
      email: {
        allowNull: false,
        unique: true,
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
        allowNull: false,
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
    })
    .then(() => queryInterface.addConstraint('patients', {
      type: 'FOREIGN KEY',
      name: 'patients_ibfk_logins', // useful if using queryInterface.removeConstraint
      fields: ['email'], 
      references: {
        table: 'Logins',
        field: 'email',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
    .then(() => queryInterface.addConstraint('patients', {
      type: 'FOREIGN KEY',
      name: 'patients_ibfk_allcodes', // useful if using queryInterface.removeConstraint
      fields: ['Patient_gender'], 
      references: {
        table: 'Allcodes',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Patients');
  }
};