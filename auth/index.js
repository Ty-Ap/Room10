'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users-models');
const DB_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : 'postgres://bennett_401_labs_database_user:gQDAokLUlcgk7Ezciamwy8Bay6kmkQxO@dpg-cfn4i02rrk0eqlu8lun0-a/bennett_401_labs_database';
// const DB_URL = 'postgres://localhost:5432/room10';
const db = new Sequelize(DB_URL);
const userModel = userSchema(db, DataTypes);

module.exports = { db, userModel };