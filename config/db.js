const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('uptask', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize