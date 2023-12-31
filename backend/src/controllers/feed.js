const feedService = require('../services/feed');
const userService = require('../services/user');

const feedController = {
  getFeeds: async (req, res) => {
    try {
      const { from, to, search } = req.query;
      const data = await feedService.getFeeds({ from, to, search });

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  feedPuller: async (url) => {
    try {
      if (url) {
        return feedService.createFeedArticles(url);
      }

      return { success: false, message: 'Bad request! Url is required' };
    } catch (error) {
      return { success: false, message: error?.message, error };
    }
  },
  updateById: async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const data = await feedService.updateById({
        title,
        id,
      });

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await feedService.deleteById(id);

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
};

module.exports = feedController;
