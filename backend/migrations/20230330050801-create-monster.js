'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('monsters', {
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
        type: Sequelize.ARRAY(Sequelize.JSON)
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
        type: Sequelize.INTEGER
      },
      dexterity: {
        type: Sequelize.INTEGER
      },
      constitution: {
        type: Sequelize.INTEGER
      },
      wisdom: {
        type: Sequelize.INTEGER
      },
      intelligence: {
        type: Sequelize.INTEGER
      },
      charisma: {
        type: Sequelize.INTEGER
      },
      proficiencies: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      damage_resistances: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      damage_immunities: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      damage_vulnerabilities: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      condition_immunities: {
        type: Sequelize.ARRAY(Sequelize.JSON)
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
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      actions: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      legendary_actions: {
        type: Sequelize.ARRAY(Sequelize.JSON)
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
    await queryInterface.dropTable('monsters');
  }
};