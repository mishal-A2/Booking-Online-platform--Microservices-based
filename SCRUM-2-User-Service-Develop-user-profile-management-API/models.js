const pool = require("./db");

const user_create = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

const find_user_by_mail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { user_create, find_user_by_mail };
