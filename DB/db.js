const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
  host:process.env.HOST,
  dialect: 'mysql' ,// Specify the database type
  port: 3306,
 
});

console.log(process.env.PASSWORD ,process.env.DATABASE,process.env.USER_NAME,process.env.HOST);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
