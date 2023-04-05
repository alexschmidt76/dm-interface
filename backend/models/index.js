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
/* // User Model
const User = require('./user')(sequelize, DataTypes)
db[User.name] = User
// Monster Model
const Monster = require('./monster')(sequelize, DataTypes)
db[User.name]
// Campaign Model
const Campaign = require('./campaign')(sequelize, DataTypes)
db[Campaign.name] = Campaign
// Session Model
const Session = require('./session')(sequelize, DataTypes)
db[Session.name] = Session */

// Associate models with eachother
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;