const pool = require('../utils/database');

async function getAllServices() {
  const [rows] = await pool.query(
    'SELECT * FROM services ORDER BY id ASC'
  );

  return rows;
}

async function createService(data) {
  const {
    title,
    description,
    image
  } = data;

  const [result] = await pool.query(
    `INSERT INTO services
    (title, description, image)
    VALUES (?, ?, ?)`,
    [
      title,
      description,
      image || null
    ]
  );

  return result.insertId;
}

async function updateService(id, data) {
  const {
    title,
    description,
    image
  } = data;

  const [result] = await pool.query(
    `UPDATE services
     SET title = ?,
         description = ?,
         image = ?
     WHERE id = ?`,
    [
      title,
      description,
      image || null,
      id
    ]
  );

  return result.affectedRows;
}

async function deleteService(id) {
  const [result] = await pool.query(
    'DELETE FROM services WHERE id = ?',
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService
};