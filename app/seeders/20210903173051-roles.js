"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "super",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "admin",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "user",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "nurse",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "head of department",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "head of section",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "head of division",
        },
        {
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "finance",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
