'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Doctors', [{
      email: 'doctor1@gmail.com',
      password: '123456', //must hash
      Patient_firstName: 'Chrom',
      lastName: 'Hưng',
      address: "123, WallStreet",
      gender: 0,
      Age: 40,
      ClinicId: 1,
      SpecializationId: 2,
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
