'use strict';
const bcrypt=require("bcrypt");
const salt=bcrypt.genSaltSync(19);
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('users', [
    {
      name: 'Sasanka',
      age:21,
      mobile:'9494344363',
      email: 'sasanka.g@westagilelabs.com',
      password:bcrypt.hashSync('Sasanka_123',salt),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Saranya',
      age:29,
      mobile:'9494681291',
      email: 'saranya.k@westagilelabs.com',
      password:bcrypt.hashSync('Saranya_123',salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('users', null, {});
  }
};
