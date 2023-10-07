const { Model } = require('sequelize');

// const { FeedArticle } = require('./index');

module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Feed.hasMany(FeedArticle, { foreignKey: 'id' });
    }
  }
  Feed.init({
    title: DataTypes.STRING,
    webMaster: DataTypes.STRING,
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    imageTitle: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    generator: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Feed',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });

  return Feed;
};
