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
      // field: 'title',
    },
    webMaster: {
      type: DataTypes.STRING,
      // field: 'webMaster',
    },
    url: {
      type: DataTypes.STRING,
      // field: 'url',
    },
    imageUrl: {
      type: DataTypes.STRING,
      // field: 'imageUrl',
    },
    imageTitle: {
      type: DataTypes.STRING,
      // field: 'imageTitle',
    },
    imageLink: {
      type: DataTypes.STRING,
      // field: 'imageLink',
    },
    generator: {
      type: DataTypes.STRING,
      // field: 'generator',
    },
    link: {
      type: DataTypes.STRING,
      // field: 'link',
    },
    description: {
      type: DataTypes.STRING,
      // field: 'description',
    },
    createdAt: {
      // field: 'createdAt',
      type: DataTypes.DATE,
    },
    updatedAt: {
      // field: 'updatedAt',
      type: DataTypes.DATE,
    },
    deletedAt: {
      // field: 'deletedAt',
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
