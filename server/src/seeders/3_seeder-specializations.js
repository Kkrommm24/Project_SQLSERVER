'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Specializations', [
      {
        Specialization_description:
          'Chuyên khoa Tim mạch chuyên về chuẩn đoán và điều trị các bệnh lý về tim mạch.',
        Specialization_image: 'image1.jpg',
        Specialization_name: 'Tim mạch',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Specialization_description:
          'Chuyên khoa Nội khoa chăm sóc và điều trị các bệnh nội khoa như bệnh tiểu đường, huyết áp cao, bệnh lý tiêu hóa và các bệnh nội tiết.',
        Specialization_image: 'image2.jpg',
        Specialization_name: 'Nội khoa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Specialization_description:
          'Chuyên khoa Da liễu chăm sóc và điều trị các vấn đề liên quan đến da, tóc và móng.',
        Specialization_image: 'image3.jpg',
        Specialization_name: 'Da liễu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Specialization_description:
          'Chuyên khoa Răng hàm mặt chăm sóc và điều trị các vấn đề về răng, miệng và quầng hàm.',
        Specialization_image: 'image4.jpg',
        Specialization_name: 'Răng hàm mặt',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Specialization_description:
          'Chuyên khoa Sản phụ khoa chăm sóc và điều trị các vấn đề liên quan đến sức khỏe phụ nữ, thai sản và phụ khoa.',
        Specialization_image: 'image5.jpg',
        Specialization_name: 'Sản phụ khoa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Specializations', null, {
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
