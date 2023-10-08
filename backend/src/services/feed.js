const RSSParser = require('rss-parser');
const { Op } = require('sequelize');
const { Feed, FeedArticle } = require('../models');

const parser = new RSSParser();

const feedService = {
  createFeedArticles: async (url) => {
    try {
      const feedData = await parser.parseURL(url);

      const {
        title,
        webMaster,
        feedUrl,
        image,
        generator,
        link,
        description,
        items,
      } = feedData;

      const feedInstance = await Feed.create({
        title: title?.trim() || '',
        webMaster: webMaster || '',
        url: feedUrl,
        imageUrl: image?.url || '',
        imageTitle: image?.title || '',
        imageLink: image?.link || '',
        generator: generator || '',
        link,
        description: description || '',
      });

      const feedArticlePromises = [];

      items.forEach(item => {
        const {
          title: articleTitle,
          creator,
          link: articleLink,
          pubDate,
          guid,
          isoDate,
          'dc:creator': dcCreator,
        } = item;

        feedArticlePromises.push(FeedArticle.create({
          title: articleTitle || '',
          feedId: feedInstance.id,
          creator: creator || '',
          link: articleLink || '',
          pubDate: pubDate || '',
          guid: typeof guid === 'string' ? guid : '',
          isoDate: isoDate || '',
          dcCreator: dcCreator || '',
        }));
      });

      return await Promise.all(feedArticlePromises);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return new Error(error);
    }
  },
  getFeeds: async ({ from, to, search = '' }) => {
    try {
      const limit = Number(to) - Number(from);
      const offset = Number(from);

      return FeedArticle.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        offset,
        limit,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return new Error(error);
    }
  },
};

module.exports = feedService;
