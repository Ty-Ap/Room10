'use strict';

const userSchema = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startTime: {type: DataTypes.INTEGER},
  endTime: {type: DataTypes.INTEGER},
  highScore: {type: DataTypes.INTEGER},
})};


module.exports = userSchema;