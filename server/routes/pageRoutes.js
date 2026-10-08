const express = require('express');

const pageController =
  require('../controllers/pageController');

const authMiddleware =
  require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/',
  pageController.getPages
);

router.get(
  '/:slug',
  pageController.getPage
);

router.put(
  '/:id',
  authMiddleware,
  pageController.updatePage
);

module.exports = router;