// file config
'use strict';
require('dotenv').config()
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize
const db = {};

// sequelize connection
const sequelize = new Sequelize(process.env.DB_URL)

// attach models to db object
// User Model
const User = require('./user')(sequelize, DataTypes)
db[User.name] = User

// Associate models with eachother
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;