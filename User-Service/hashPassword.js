const bcrypt = require("bcryptjs");
const pool = require("./db");

async function hashExistingPasswords() {
  try {
    const users = await pool.query("SELECT id, password FROM users");

    for (const user of users.rows) {
      if (user.password.length < 60) { // Avoid re-hashing
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, user.id]);
        console.log(`Updated password for user ID: ${user.id}`);
      }
    }
    console.log("Password hashing completed.");
  } catch (err) {
    console.error("Error hashing passwords:", err);
  } finally {
    pool.end();
  }
}

hashExistingPasswords();
