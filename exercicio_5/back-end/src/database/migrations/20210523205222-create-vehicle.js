"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vehicle", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vehicle: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      sold: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE(),
      },
      updatedAt: {
        type: Sequelize.DATE(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("vehicle");
  },
};
