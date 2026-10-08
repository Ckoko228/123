const contactModel = require('../models/contactModel');

async function getRequests(req, res) {
  try {
    const requests = await contactModel.getAllRequests();

    res.json(requests);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load requests'
    });
  }
}
async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      'new',
      'in_progress',
      'completed'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      });
    }

    const updated = await contactModel.updateRequestStatus(
      id,
      status
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Request not found'
      });
    }

    res.json({
      message: 'Status updated successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update status'
    });
  }
}
async function createRequest(req, res) {
  try {
    const {
      name,
      phone,
      email,
      service_type,
      message,
      personal_data_consent
    } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !service_type ||
      !message ||
      !personal_data_consent
    ) {
      return res.status(400).json({
        message: 'Please fill in all required fields'
      });
    }

    const requestId = await contactModel.createRequest(req.body);

    res.status(201).json({
      message: 'Request sent successfully',
      id: requestId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create request'
    });
  }
}

module.exports = {
  getRequests,
  createRequest,
  updateStatus
};