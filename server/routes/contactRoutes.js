const express = require('express');
const contactController = require('../controllers/contactController');

const {
  validateContactRequest
} = require('../middleware/validationMiddleware');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  contactController.getRequests
);

router.post(
  '/',
  validateContactRequest,
  contactController.createRequest
);
router.patch(
  '/:id/status',
  authMiddleware,
  contactController.updateStatus
);
module.exports = router;