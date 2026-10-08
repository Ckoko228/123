const express = require('express');

const portfolioController =
  require('../controllers/portfolioController');

const authMiddleware =
  require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/',
  portfolioController.getProjects
);

router.post(
  '/',
  authMiddleware,
  portfolioController.createProject
);

router.put(
  '/:id',
  authMiddleware,
  portfolioController.updateProject
);

router.delete(
  '/:id',
  authMiddleware,
  portfolioController.deleteProject
);

module.exports = router;