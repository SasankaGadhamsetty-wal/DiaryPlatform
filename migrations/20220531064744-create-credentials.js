"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credentials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      platform: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      email: {
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "email",
        },
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("credentials");
  },
};
