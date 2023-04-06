'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    // model associations
    static associate({ User, Session }) {
      // user association (many to one)
      Campaign.belongsTo(User, {
        foreignKey: 'user_id'
      })
      // sesssion association (one to many)
      Campaign.hasMany(Session, {
        foreignKey: 'campaign_id',
        as: 'sessions'
      })
    }
  }
  Campaign.init({
    campaign_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    player_names: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Campaign',
    tableName: 'campaigns'
  });
  return Campaign;
};