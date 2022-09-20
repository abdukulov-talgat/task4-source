const {DataTypes} = require('sequelize');
const sequelize = require('./db.js')

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false,
  },
  lastVisit: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: true,
  createdAt: 'registerDate',
  updatedAt: false,
});


module.exports = {
  User
}
