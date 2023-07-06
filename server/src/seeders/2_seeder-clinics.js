'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Clinics', [
        {
            Clinic_address: '123 Clinic Street, City',
            Clinic_name: 'Phòng khám đa khoa - Cơ sở 1',
            Clinic_description: 'Cơ sở 1 của Phòng khám đa khoa được trang bị các thiết bị y tế hiện đại và có đội ngũ bác sĩ chuyên nghiệp và giàu kinh nghiệm để đảm bảo cung cấp dịch vụ chăm sóc sức khỏe chất lượng cho bệnh nhân.',
            Clinic_image: 'clinic1.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            Clinic_address: '456 Clinic Street, City',
            Clinic_name: 'Phòng khám đa khoa - Cơ sở 2',
            Clinic_description: 'Cơ sở 2 của Phòng khám đa khoa được trang bị các phòng khám chuyên khoa đa dạng và đội ngũ bác sĩ có chuyên môn cao để đáp ứng nhu cầu chăm sóc sức khỏe đa dạng của bệnh nhân.',
            Clinic_image: 'clinic2.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            Clinic_address: '789 Clinic Street, City',
            Clinic_name: 'Phòng khám đa khoa - Cơ sở 3',
            Clinic_description: 'Cơ sở 3 của Phòng khám đa khoa có không gian rộng rãi và thoải mái, cùng với trang thiết bị y tế tiên tiến để đảm bảo cung cấp dịch vụ chăm sóc sức khỏe tốt nhất cho bệnh nhân.',
            Clinic_image: 'clinic3.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            Clinic_address: 'ABC Clinic Street, City',
            Clinic_name: 'Phòng khám đa khoa - Cơ sở 4',
            Clinic_description: 'Cơ sở 4 của Phòng khám đa khoa có đội ngũ bác sĩ chất lượng cao và có kinh nghiệm trong các lĩnh vực khám bệnh và điều trị bệnh lý đa dạng, giúp bệnh nhân nhận được sự chăm sóc y tế tốt nhất.',
            Clinic_image: 'clinic4.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            Clinic_address: 'XYZ Clinic Street, City',
            Clinic_name: 'Phòng khám đa khoa - Cơ sở 5',
            Clinic_description: 'Cơ sở 5 của Phòng khám đa khoa được thiết kế hiện đại và có các phòng khám tiện nghi, đảm bảo mang đến một môi trường chăm sóc sức khỏe thoải mái và an toàn cho bệnh nhân.',
            Clinic_image: 'clinic5.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
          }
    ]);
  }, 

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Clinics', null, { truncate: true, cascade: true })

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
