"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Doctors", [
      //đã khai báo ở seeder logins
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User", null, {
      truncate: true,
      cascade: true,
    });

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
