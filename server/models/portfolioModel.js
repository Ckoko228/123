const pool = require('../utils/database');

async function getAllProjects() {
  const [rows] = await pool.query(
    'SELECT * FROM projects ORDER BY completion_date DESC'
  );

  return rows;
}

async function createProject(data) {
  const {
    title,
    description,
    category,
    completion_date,
    main_image
  } = data;

  const [result] = await pool.query(
    `INSERT INTO projects
    (title, description, category, completion_date, main_image)
    VALUES (?, ?, ?, ?, ?)`,
    [
      title,
      description,
      category,
      completion_date || null,
      main_image || null
    ]
  );

  return result.insertId;
}

async function updateProject(id, data) {
  const {
    title,
    description,
    category,
    completion_date,
    main_image
  } = data;

  const [result] = await pool.query(
    `UPDATE projects
     SET title = ?,
         description = ?,
         category = ?,
         completion_date = ?,
         main_image = ?
     WHERE id = ?`,
    [
      title,
      description,
      category,
      completion_date || null,
      main_image || null,
      id
    ]
  );

  return result.affectedRows;
}

async function deleteProject(id) {
  const [result] = await pool.query(
    'DELETE FROM projects WHERE id = ?',
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
};