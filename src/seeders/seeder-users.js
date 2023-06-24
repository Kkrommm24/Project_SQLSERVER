'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Doctors', [{
      email: 'admin@gmail.com',
      password: '123456', //must hash
      firstName: 'Chrom',
      lastName: 'Hưng',
      address: "123, WallStreet",
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, { truncate: true, cascade: true })

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
