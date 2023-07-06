'use strict';
const bcrypt = require('bcrypt');

// Các hàm tạo dữ liệu và các hàm hỗ trợ khác

async function hashPasswords(passwords) {
  const saltRounds = 10;
  const hashedPasswords = await Promise.all(
    passwords.map((password) => bcrypt.hash(password, saltRounds))
  );
  return hashedPasswords;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const logins = [];
    const passwords = [];

    for (let i = 0; i < 30; i++) {
      const email = `${generateRandomName().toLowerCase()}${i + 1}@gmail.com`;
      const password = '123456'; // Thay đổi mật khẩu theo nhu cầu
      const login = {
        email: email,
        roleId: 'Doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      logins.push(login);
      passwords.push(password);
    }

    const hashedPasswords = await hashPasswords(passwords);

    logins.forEach((login, index) => {
      login.password = hashedPasswords[index];
    });

    await queryInterface.bulkInsert('Logins', logins, {});

    // Lấy danh sách email từ bảng Logins
    const loginEmails = await queryInterface.sequelize.query('SELECT email FROM Logins;');
    const emails = loginEmails[0].map((login) => login.email);

    const doctors = [];
    // Generate 30 doctors
    for (let i = 0; i < 30; i++) {
      const firstName = generateRandomName();
      const lastName = generateRandomName();
      const email = emails[i]; // Sử dụng email từ danh sách đã tạo

      const randomClinicId = Math.floor(Math.random() * 5) + 1; // 1-5: ClinicId
      const randomSpecializationId = Math.floor(Math.random() * 5) + 1; // 1-5: SpecializationId

      const doctor = {
        email: email,
        ClinicId: randomClinicId,
        SpecializationId: randomSpecializationId,
        roleId: 'Doctor',
        Doctor_firstName: firstName,
        Doctor_lastName: lastName,
        Doctor_address: generateRandomAddress(),
        Doctor_gender: Math.floor(Math.random() * 3) + 1, // 1: Male, 2: Female, 3: Others
        Doctor_age: Math.floor(Math.random() * 20) + 30, // Random age between 30 and 50
        Doctor_phoneNumber: generateRandomPhoneNumber(),
        Doctor_image: `doctor${i + 1}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      doctors.push(doctor);
    }

    try {
      await queryInterface.bulkInsert('Doctors', doctors, {});
    } catch (error) {
      console.log('Error occurred during bulk insert:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Doctors', null, {});
    await queryInterface.bulkDelete('Logins', null, {});
  },
};

function generateRandomName() {
  const names = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Olivia', 'Daniel', 'Sophia', 'Matthew', 'Emma', 'Christopher', 'Ava', 'Andrew', 'Mia', 'William', 'Isabella', 'James', 'Abigail', 'Joseph', 'Charlotte'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

function generateRandomAddress() {
  const addresses = ['123 Doctor Street', '456 Medical Avenue', '789 Healthcare Lane', '321 Clinic Road', '987 Hospital Drive'];
  const randomIndex = Math.floor(Math.random() * addresses.length);
  return addresses[randomIndex];
}

function generateRandomPhoneNumber() {
  const phoneNumber = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}
