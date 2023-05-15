const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'track_db',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
