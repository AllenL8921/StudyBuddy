module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the `isPublic` column with a default value of 'false'
    await queryInterface.addColumn('ChatRooms', 'isPublic', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Adjust this to your desired default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the `isPublic` column in case of rollback
    await queryInterface.removeColumn('ChatRooms', 'isPublic');
  }
};
