const pool = require('../utils/database');

async function getAllPages() {
  const [rows] = await pool.query(
    'SELECT * FROM pages ORDER BY id ASC'
  );

  return rows;
}

async function getPageBySlug(slug) {
  const [rows] = await pool.query(
    'SELECT * FROM pages WHERE slug = ? LIMIT 1',
    [slug]
  );

  return rows[0];
}

async function updatePage(id, data) {
  const {
    title,
    content
  } = data;

  const [result] = await pool.query(
    `UPDATE pages
     SET title = ?,
         content = ?
     WHERE id = ?`,
    [
      title,
      content,
      id
    ]
  );

  return result.affectedRows;
}

module.exports = {
  getAllPages,
  getPageBySlug,
  updatePage
};