const { Model } = require('sequelize');

// const { Feed } = require('./index');

module.exports = (sequelize, DataTypes) => {
  class FeedArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // FeedArticle.belongsTo(Feed, { foreignKey: 'feedId' });
    }
  }
  FeedArticle.init({
    title: DataTypes.STRING,
    feedId: {
      type: DataTypes.INTEGER,
    },
    creator: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    pubDate: {
      type: DataTypes.STRING,
    },
    contentEncodedSnippet: {
      type: DataTypes.STRING,
    },
    guid: {
      type: DataTypes.STRING,
    },
    isoDate: {
      type: DataTypes.STRING,
    },
    dcCreator: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'FeedArticle',
    paranoid: true,
    timestamps: true,
  });

  return FeedArticle;
};
