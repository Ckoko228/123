const pool = require('../utils/database');

async function getAllRequests() {
  const [rows] = await pool.query(
    'SELECT * FROM contact_requests ORDER BY created_at DESC'
  );

  return rows;
}

async function createRequest(data) {
  const {
    name,
    phone,
    email,
    service_type,
    message,
    personal_data_consent
  } = data;

  const [result] = await pool.query(
    `INSERT INTO contact_requests
    (name, phone, email, service_type, message, personal_data_consent, status)
    VALUES (?, ?, ?, ?, ?, ?, 'new')`,
    [
      name,
      phone,
      email,
      service_type,
      message,
      personal_data_consent
    ]
  );

  return result.insertId;
}

async function updateRequestStatus(id, status) {
  const [result] = await pool.query(
    `UPDATE contact_requests
     SET status = ?
     WHERE id = ?`,
    [status, id]
  );

  return result.affectedRows;
}

module.exports = {
  getAllRequests,
  createRequest,
  updateRequestStatus
};