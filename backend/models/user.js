'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Campaign, Monster }) {
      // campaign association
      User.hasMany(Campaign, {
        foreignKey: "user_id",
        as: "campaigns"
      })
      // monster association
      User.hasMany(Monster, {
        foreignKey: "user_id",
        as: "monsters"
      })
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};