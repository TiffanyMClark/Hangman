"use strict";
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("riddles", "question", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.changeColumn("riddles", "answer", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("riddles", "question", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
    await queryInterface.changeColumn("riddles", "answer", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },
};
