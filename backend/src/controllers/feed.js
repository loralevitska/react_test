const feedService = require('../services/feed');

const feedController = {
  saveFeed: async (req, res) => {
    try {
      const { url } = req.body;
      const data = await feedService.createFeedArticles(url);

      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
};

module.exports = feedController;
