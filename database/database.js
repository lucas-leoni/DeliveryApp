const Sequelize = require('sequelize');
const connection = new Sequelize('delivery', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;