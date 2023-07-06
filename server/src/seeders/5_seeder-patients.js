'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Patients', [{
     
    }]);
  }, 

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Patients', null, { truncate: true, cascade: true })

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
