// file config
'use strict';
require('dotenv').config()
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize
const db = {};

// sequelize connection
const sequelize = new Sequelize(process.env.DB_URL)

// attach models to db object
const modelPaths = [
  './user',
  './monster',
  './campaign',
  './session'
]
modelPaths.forEach(modelPath => {
  const Model = require(modelPath)(sequelize, DataTypes)
  db[Model.name] = Model
})

// Associate models with eachother
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;