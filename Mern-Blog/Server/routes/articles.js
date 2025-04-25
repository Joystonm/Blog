const express = require('express');
const jwt = require('jsonwebtoken');
const Article = require('../models/Article');
const User = require('../models/User');
const router = express.Router();

// Middleware to check for a valid JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Post article
router.post('/', authenticate, async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const article = new Article({
      title,
      content,
      image,
      author: req.user
    });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Error posting article', error: err });
  }
});

module.exports = router;
