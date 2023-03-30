'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Monsters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      alignment: {
        type: Sequelize.STRING
      },
      armor_class: {
        type: Sequelize.ARRAY
      },
      hit_points: {
        type: Sequelize.INTEGER
      },
      hit_points_roll: {
        type: Sequelize.STRING
      },
      speed: {
        type: Sequelize.JSON
      },
      strength: {
        type: Sequelize.NUMBER
      },
      dexterity: {
        type: Sequelize.NUMBER
      },
      constitution: {
        type: Sequelize.NUMBER
      },
      wisdom: {
        type: Sequelize.NUMBER
      },
      intelligence: {
        type: Sequelize.NUMBER
      },
      charisma: {
        type: Sequelize.NUMBER
      },
      proficiencies: {
        type: Sequelize.ARRAY
      },
      damage_resistances: {
        type: Sequelize.ARRAY
      },
      damage_immunities: {
        type: Sequelize.ARRAY
      },
      damage_vulnerabilities: {
        type: Sequelize.ARRAY
      },
      condition_immunities: {
        type: Sequelize.ARRAY
      },
      senses: {
        type: Sequelize.JSON
      },
      languages: {
        type: Sequelize.STRING
      },
      challenge_rating: {
        type: Sequelize.INTEGER
      },
      xp: {
        type: Sequelize.INTEGER
      },
      special_abilities: {
        type: Sequelize.ARRAY
      },
      actions: {
        type: Sequelize.ARRAY
      },
      legendary_actions: {
        type: Sequelize.ARRAY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Monsters');
  }
};