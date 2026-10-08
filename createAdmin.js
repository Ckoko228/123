const bcrypt = require('bcrypt');
const pool = require('./server/utils/database');

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123';

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO admins (username, password_hash)
       VALUES (?, ?)`,
      [username, passwordHash]
    );

    console.log('Admin created successfully');
    console.log('Username:', username);
    console.log('Password:', password);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();