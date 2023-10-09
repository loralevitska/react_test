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
    title: {
      type: DataTypes.STRING,
    },
    webMaster: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    imageTitle: {
      type: DataTypes.STRING,
    },
    imageLink: {
      type: DataTypes.STRING,
    },
    generator: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Feed',
    paranoid: true,
    timestamps: true,
  });

  return Feed;
};
