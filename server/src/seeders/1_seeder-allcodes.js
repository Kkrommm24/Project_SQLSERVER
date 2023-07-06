'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Allcodes', [
        {
            key: 'M',
            type: 'GENDER',
            valueEn: 'Male',
            valueVi: 'Nam',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'F',
            type: 'GENDER',
            valueEn: 'Female',
            valueVi: 'Nữ',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'O',
            type: 'GENDER',
            valueEn: 'Other',
            valueVi: 'Khác',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'S1',
            type: 'STATUS',
            valueEn: 'Pending',
            valueVi: 'Chờ xác nhận',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'S2',
            type: 'STATUS',
            valueEn: 'Confirmed',
            valueVi: 'Đã xác nhận',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'S3',
            type: 'STATUS',
            valueEn: 'Done',
            valueVi: 'Đã khám xong',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'S4',
            type: 'STATUS',
            valueEn: 'Cancel',
            valueVi: 'Đã hủy',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T1',
            type: 'TIME',
            valueEn: '8:00 AM - 9:00 AM',
            valueVi: '8:00 - 9:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T2',
            type: 'TIME',
            valueEn: '9:00 AM - 10:00 AM',
            valueVi: '9:00 - 10:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T3',
            type: 'TIME',
            valueEn: '10:00 AM - 11:00 AM',
            valueVi: '10:00 - 11:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T4',
            type: 'TIME',
            valueEn: '11:00 AM - 12:00 PM',
            valueVi: '11:00 - 12:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T5',
            type: 'TIME',
            valueEn: '1:00 PM - 2:00 PM',
            valueVi: '13:00 - 14:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T6',
            type: 'TIME',
            valueEn: '2:00 PM - 3:00 PM',
            valueVi: '14:00 - 15:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T7',
            type: 'TIME',
            valueEn: '3:00 PM - 4:00 PM',
            valueVi: '15:00 - 16:00',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            key: 'T8',
            type: 'TIME',
            valueEn: '4:00 PM - 5:00 PM',
            valueVi: '16:00 - 17:00',
            createdAt: new Date(),
            updatedAt: new Date()
          }
    ]);
  }, 

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Allcodes', null, { truncate: true, cascade: true })

  }
};
