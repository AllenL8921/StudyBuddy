'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Update rows where the old column has NULL values
    await queryInterface.sequelize.query(
      `UPDATE "ChatRooms" SET "name" = 'Default Room Name' WHERE "name" IS NULL`
    );

    // Step 2: Rename the column from 'name' to 'roomName'
    await queryInterface.renameColumn('ChatRooms', 'name', 'roomName');
  },

  down: async (queryInterface, Sequelize) => {
    // Step 1: Rename the column back to 'name'
    await queryInterface.renameColumn('ChatRooms', 'roomName', 'name');
  }
};
