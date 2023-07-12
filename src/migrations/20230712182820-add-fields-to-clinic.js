'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clinics', 'introduction', Sequelize.STRING);
    await queryInterface.addColumn('Clinics', 'specialty', Sequelize.STRING);
    await queryInterface.addColumn('Clinics', 'doctors', Sequelize.STRING);
    await queryInterface.addColumn('Clinics', 'booking', Sequelize.STRING);
    await queryInterface.addColumn('Clinics', 'location', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clinics', 'introduction');
    await queryInterface.removeColumn('Clinics', 'specialty');
    await queryInterface.removeColumn('Clinics', 'doctors');
    await queryInterface.removeColumn('Clinics', 'booking');
    await queryInterface.removeColumn('Clinics', 'location');
  }
};
