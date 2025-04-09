const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Riddle = sequelize.define('Riddle', {
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Riddle;
