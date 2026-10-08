const pool = require('../utils/database');

async function findByUsername(username) {
  const [rows] = await pool.query(
    'SELECT * FROM admins WHERE username = ? LIMIT 1',
    [username]
  );

  return rows[0];
}

async function createAdmin(username, passwordHash) {
  const [result] = await pool.query(
    `INSERT INTO admins (username, password_hash)
     VALUES (?, ?)`,
    [username, passwordHash]
  );

  return result.insertId;
}

module.exports = {
  findByUsername,
  createAdmin
};