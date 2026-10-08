const express = require('express');

const serviceController =
  require('../controllers/serviceController');

const authMiddleware =
  require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/',
  serviceController.getServices
);

router.post(
  '/',
  authMiddleware,
  serviceController.createService
);

router.put(
  '/:id',
  authMiddleware,
  serviceController.updateService
);

router.delete(
  '/:id',
  authMiddleware,
  serviceController.deleteService
);

module.exports = router;