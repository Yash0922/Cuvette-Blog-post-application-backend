const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../DB/db');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

});

module.exports = Comment;