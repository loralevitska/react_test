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
    feedId: DataTypes.INTEGER,
    creator: DataTypes.STRING,
    link: DataTypes.STRING,
    pubDate: DataTypes.STRING,
    contentEncodedSnippet: DataTypes.STRING,
    guid: DataTypes.STRING,
    isoDate: DataTypes.STRING,
    dcCreator: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'FeedArticle',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });

  return FeedArticle;
};
