const serviceModel = require('../models/serviceModel');

async function getServices(req, res) {
  try {
    const services = await serviceModel.getAllServices();

    res.json(services);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load services'
    });
  }
}

async function createService(req, res) {
  try {
    const {
      title,
      description
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required'
      });
    }

    const id = await serviceModel.createService(req.body);

    res.status(201).json({
      message: 'Service created successfully',
      id
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create service'
    });
  }
}

async function updateService(req, res) {
  try {
    const { id } = req.params;

    const updated = await serviceModel.updateService(
      id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.json({
      message: 'Service updated successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update service'
    });
  }
}

async function deleteService(req, res) {
  try {
    const { id } = req.params;

    const deleted = await serviceModel.deleteService(id);

    if (!deleted) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.json({
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete service'
    });
  }
}

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};