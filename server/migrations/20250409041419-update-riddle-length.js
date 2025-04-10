"use strict";
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("riddles", "question", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn("riddles", "answer", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("riddles", "question", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn("riddles", "answer", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};
