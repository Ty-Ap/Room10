'use strict';

const userSchema = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('prisoners', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bestScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  })
};


module.exports = userSchema;