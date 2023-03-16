'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users-models');
const DB_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : 'postgres://localhost:5432/room10';
// const DB_URL = 'postgres://localhost:5432/room10';
const db = new Sequelize(DB_URL);
const userModel = userSchema(db, DataTypes);

module.exports = { db, userModel };