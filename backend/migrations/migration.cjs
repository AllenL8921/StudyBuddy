'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Step 1: Add the new column 'senderDisplayName' with NULL values allowed
        await queryInterface.addColumn('Messages', 'senderDisplayName', {
            type: Sequelize.STRING,
            allowNull: true,  // Allow NULL values temporarily
        });

        // Step 2: Update existing rows with a default value for 'senderDisplayName'
        // You may want to set a default display name, or populate it based on existing data.
        // For example, we'll set the 'senderDisplayName' to an empty string, but this could be
        // set to any default value or based on another column if appropriate.

        await queryInterface.sequelize.query(
            `UPDATE "Messages" SET "senderDisplayName" = 'Default Display Name' WHERE "senderDisplayName" IS NULL`
        );

        // Step 3: If you want to set the column as NOT NULL after updating existing data, you can use:
        await queryInterface.changeColumn('Messages', 'senderDisplayName', {
            type: Sequelize.STRING,
            allowNull: false,  // Set as NOT NULL after ensuring data is populated
        });
    },

    async down(queryInterface, Sequelize) {
        // Step 1: In the down migration, you should remove the column.
        await queryInterface.removeColumn('Messages', 'senderDisplayName');
    }
};
