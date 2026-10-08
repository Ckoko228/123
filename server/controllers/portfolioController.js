const portfolioModel = require('../models/portfolioModel');

async function getProjects(req, res) {
  try {
    const projects = await portfolioModel.getAllProjects();

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load projects'
    });
  }
}

async function createProject(req, res) {
  try {
    const {
      title,
      description,
      category
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: 'Required fields are missing'
      });
    }

    const id = await portfolioModel.createProject(req.body);

    res.status(201).json({
      message: 'Project created successfully',
      id
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create project'
    });
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;

    const updated = await portfolioModel.updateProject(
      id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.json({
      message: 'Project updated successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update project'
    });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const deleted = await portfolioModel.deleteProject(id);

    if (!deleted) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.json({
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete project'
    });
  }
}

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};