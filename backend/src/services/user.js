const { User } = require('../models/index');

const userService = {
  // eslint-disable-next-line consistent-return,no-async-promise-executor
  findAll: () => new Promise(async (resolve, reject) => {
    try {
      const data = await User.findAll();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  }),
  // eslint-disable-next-line consistent-return,no-async-promise-executor
  findById: (id) => new Promise(async (resolve, reject) => {
    try {
      const data = await User.findByPk(id);

      if (!data) {
        return reject(new Error('User do not found'));
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  }),
  login: async (email, password) => {
    try {
      const data = await User.findOne({ where: { email, password } });

      if (!data) {
        return new Error('Email or password are invalid');
      }

      return data;
    } catch (error) {
      return error;
    }
  },

  create: ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    // eslint-disable-next-line consistent-return,no-async-promise-executor
  }) => new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        return reject(new Error(`Email ${email} is already exist`));
      }

      const data = await User.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  }),
  updateById: (id, {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }) => async () => {
    try {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return new Error('User do not found');
      }

      const data = await User.update({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      }, {
        where: { id },
      });

      return new Promise((resolve) => resolve(data));
    } catch (error) {
      return new Promise((resolve, reject) => reject(error));
    }
  },
  // eslint-disable-next-line consistent-return,no-async-promise-executor
  deleteById: (id) => new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return reject(new Error('User do not found'));
      }

      const data = await User.destroy({ where: { id } });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  }),
};

module.exports = userService;
