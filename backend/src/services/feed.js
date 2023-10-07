const RSSParser = require('rss-parser');
const { Feed, User} = require('../models');
const { FeedArticle } = require('../models');

const parser = new RSSParser();

const feedService = {
  createFeedArticles: async (url) => {
    try {
      const data = await parser.parseURL(url);

      console.log('data', data);
      const {
        title,
        webMaster,
        feedUrl,
        image,
        generator,
        link,
        description,
        items,
      } = data;

      const feedInstance = await Feed.create({
        title,
        webMaster,
        url: feedUrl,
        imageUrl: image?.url || '',
        imageTitle: image?.title || '',
        imageLink: image?.link || '',
        generator,
        link,
        description,
      });

      const feedArticlePromises = [];

      console.log('feedInstance', feedInstance);

      items.forEach((item) => {
        const {
          title: articleTitle,
          creator,
          link: articleLink,
          pubDate,
          'content:encodedSnippet': contentEncodedSnippet,
          guid,
          isoDate,
          'dc:creator': dcCreator,
        } = item;

        feedArticlePromises.push(FeedArticle.create({
          title: articleTitle,
          feedId: feedInstance.id,
          creator,
          link: articleLink,
          pubDate,
          contentEncodedSnippet,
          guid,
          isoDate,
          dcCreator,
        }));
      });

      return await Promise.all(feedArticlePromises);
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = feedService;
