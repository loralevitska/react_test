/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FeedArticles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      feedId: {
        type: Sequelize.INTEGER,
        // references: { model: 'Feed', key: 'id' },
      },
      creator: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      pubDate: {
        type: Sequelize.STRING,
      },
      contentEncodedSnippet: {
        type: Sequelize.STRING,
      },
      guid: {
        type: Sequelize.STRING,
      },
      isoDate: {
        type: Sequelize.STRING,
      },
      dcCreator: {
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
    //   .then(() => queryInterface.addConstraint('Feeds', {
    //   type: 'FOREIGN KEY',
    //   name: 'id', // useful if using queryInterface.removeConstraint
    //   fields: ['id'],
    //   references: {
    //     table: 'Feeds',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Feeds', 'id');
    await queryInterface.dropTable('FeedArticles');
  },
};
