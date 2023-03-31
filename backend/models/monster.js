'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monster extends Model {
    static associate({ User, Session }) {
      Monster.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
      })
      Monster.belongsToMany(Session, {
        foreignKey: 'monster_id',
        as: 'sessions',
        through: 'SessionMonster'
      })
    }
  }
  Monster.init({
    monster_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    type: DataTypes.STRING,
    alignment: DataTypes.STRING,
    armor_class: DataTypes.ARRAY(DataTypes.JSON),
    hit_points: DataTypes.INTEGER,
    hit_points_roll: DataTypes.STRING,
    speed: DataTypes.JSON,
    strength: DataTypes.INTEGER,
    dexterity: DataTypes.INTEGER,
    constitution: DataTypes.INTEGER,
    wisdom: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    charisma: DataTypes.INTEGER,
    proficiencies: DataTypes.ARRAY(DataTypes.JSON),
    damage_resistances: DataTypes.ARRAY(DataTypes.STRING),
    damage_immunities: DataTypes.ARRAY(DataTypes.STRING),
    damage_vulnerabilities: DataTypes.ARRAY(DataTypes.STRING),
    condition_immunities: DataTypes.ARRAY(DataTypes.JSON),
    senses: DataTypes.JSON,
    languages: DataTypes.STRING,
    challenge_rating: DataTypes.INTEGER,
    xp: DataTypes.INTEGER,
    special_abilities: DataTypes.ARRAY(DataTypes.JSON),
    actions: DataTypes.ARRAY(DataTypes.JSON),
    legendary_actions: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    sequelize,
    modelName: 'Monster',
    tableName: 'monster'
  });
  return Monster;
};