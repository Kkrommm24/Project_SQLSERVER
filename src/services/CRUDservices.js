const bcrypt = require('bcrypt');
const saltRounds = 10;

import db from '../models/index';
import user from '../models/user';

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hassPasswordfromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hassPasswordfromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === '1' ? true : false,
        roleID: data.roleID,
      });
      resolve('Done create a new user.');
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, saltRounds);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfobyID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          await db.User.destroy({
              where: { id: id }
          });
          resolve('User has been deleted.');
      } catch (e) {
          reject(e);
      }
  });
};

let updateClinicData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
      });
      if (clinic) {
        clinic.name = data.name;
        clinic.address = data.address;
        clinic.description = data.description;
        clinic.image = data.image;
        await clinic.save();
        let allClinics = await db.Clinic.findAll();
        resolve(allClinics);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let deleteClinic = (slug) => {
  return new Promise(async (resolve, reject) => {
      try {
          await db.Clinic.destroy({
              where: { slug: slug }
          });
          resolve('Clinic has been deleted.');
      } catch (e) {
          reject(e);
      }
  });
};


module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfobyID: getUserInfobyID,
  updateUserData: updateUserData,
  deleteUser: deleteUser, // Export the new function
  updateClinicData: updateClinicData,
  deleteClinic: deleteClinic,
};