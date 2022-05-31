'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'email',
        },
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
    await queryInterface.dropTable('diaries');
  }
};


