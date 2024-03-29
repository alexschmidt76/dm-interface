'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    // model associations
    static associate({ User, Monster, Campaign }) {
      // user association (many to one)
      Session.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
      })
      // campaign association (many to one)
      Session.belongsTo(Campaign, {
        foreignKey: 'campaign_id',
        as: 'campaign'
      })
      // monster association (many to many)
      Session.belongsToMany(Monster, {
        foreignKey: 'session_id',
        as: 'custom_monsters',
        through: 'SessionMonster'
      })
    }
  }
  Session.init({
    session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    api_monsters: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    initiatives: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions'
  });
  return Session;
};