const jwt = require('jsonwebtoken');
const userService = require('../services/user');

const verifyJwt = (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    return res.status(401);
  }

  jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
    if (err) {
      res.json('Not Authenticated');
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

const userController = {
  findAll: async (req, res) => {
    try {
      const data = await userService.findAll();

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await userService.findById(id);

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const data = await userService.login(email, password);

      if (data?.id) {
        const token = jwt.sign({ id: data?.id }, 'jwtSecretKey', { expiresIn: 300 });

        return res.json({ success: true, token, data });
      }

      return res.status(401).json({ success: false });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  create: async (req, res) => {
    try {
      const {
        email, password, firstName, lastName, phoneNumber,
      } = req.body;

      const data = await userService.create({
        email, password, firstName, lastName, phoneNumber,
      });

      return res.json({ success: true, data });
    } catch (error) {
      if (error?.message.includes('is already exist')) {
        return res.json({ success: false, message: error?.message, error });
      }

      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  updateById: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        email, password, firstName, lastName, phoneNumber,
      } = req.body;

      const data = await userService.updateById(id, {
        email, password, firstName, lastName, phoneNumber,
      });

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await userService.deleteById(id);

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message, error });
    }
  },
};

module.exports = userController;
