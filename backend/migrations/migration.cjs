'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Step 1: Add the `displayName` column with default value and no NULLs
        await queryInterface.addColumn('Users', 'displayName', {
            type: Sequelize.STRING,
            allowNull: false,  // Ensures the column cannot have NULL values
            defaultValue: 'Anonymous',  // Sets default value for existing records
        });

        // Step 2: Ensure no NULL values exist for `displayName` in existing records
        await queryInterface.sequelize.query(`
      UPDATE "Users"
      SET "displayName" = 'Anonymous'
      WHERE "displayName" IS NULL;
    `);
    },

    down: async (queryInterface, Sequelize) => {
        // Rollback logic: Remove the `displayName` column
        await queryInterface.removeColumn('Users', 'displayName');
    }
};
