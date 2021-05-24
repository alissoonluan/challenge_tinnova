const Sequelize = require("sequelize");
const { sequelize } = require("../database/index");

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
    type: Sequelize.STRING,
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
};

const vehicle = sequelize.define("vehicle", attributes);

exports.vehicle = vehicle;
