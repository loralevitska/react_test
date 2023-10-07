const { Sequelize } = require('sequelize');
/* eslint-disable */

const sequelize = new Sequelize('feed_parser', 'root', 'rootroot', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();
