"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("riddles", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn("riddles", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("riddles", "createdAt");
    await queryInterface.removeColumn("riddles", "updatedAt");
  },
};
