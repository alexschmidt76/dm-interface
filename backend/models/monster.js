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
    armor_class: DataTypes.ARRAY,
    hit_points: DataTypes.INTEGER,
    hit_points_roll: DataTypes.STRING,
    speed: DataTypes.JSON,
    strength: DataTypes.NUMBER,
    dexterity: DataTypes.NUMBER,
    constitution: DataTypes.NUMBER,
    wisdom: DataTypes.NUMBER,
    intelligence: DataTypes.NUMBER,
    charisma: DataTypes.NUMBER,
    proficiencies: DataTypes.ARRAY,
    damage_resistances: DataTypes.ARRAY,
    damage_immunities: DataTypes.ARRAY,
    damage_vulnerabilities: DataTypes.ARRAY,
    condition_immunities: DataTypes.ARRAY,
    senses: DataTypes.JSON,
    languages: DataTypes.STRING,
    challenge_rating: DataTypes.INTEGER,
    xp: DataTypes.INTEGER,
    special_abilities: DataTypes.ARRAY,
    actions: DataTypes.ARRAY,
    legendary_actions: DataTypes.ARRAY
  }, {
    sequelize,
    modelName: 'Monster',
    tableName: 'monster'
  });
  return Monster;
};