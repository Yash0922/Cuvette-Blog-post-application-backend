const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog', 'root', 'Yash@151822', {
  host: 'localhost',
  dialect: 'mysql' // Specify the database type
});

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
