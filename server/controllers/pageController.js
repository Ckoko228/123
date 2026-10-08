const pageModel = require('../models/pageModel');

async function getPages(req, res) {
  try {
    const pages = await pageModel.getAllPages();

    res.json(pages);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load pages'
    });
  }
}

async function getPage(req, res) {
  try {
    const { slug } = req.params;

    const page = await pageModel.getPageBySlug(slug);

    if (!page) {
      return res.status(404).json({
        message: 'Page not found'
      });
    }

    res.json(page);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load page'
    });
  }
}

async function updatePage(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      content
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required'
      });
    }

    const updated = await pageModel.updatePage(
      id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Page not found'
      });
    }

    res.json({
      message: 'Page updated successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update page'
    });
  }
}

module.exports = {
  getPages,
  getPage,
  updatePage
};