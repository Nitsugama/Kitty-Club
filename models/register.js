import { query } from '../config/db';

class User {
  constructor(user_name, user_email, user_pass) {
    this.user_name = user_name;
    this.user_email = user_email;
    this.user_pass = user_pass;
  }

  async register() {
    const sql = 'INSERT INTO login_tables SET ?';
    const newUser = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_pass: this.user_pass
    };

    try {
      const result = await query(sql, newUser);
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async login(user_email, user_pass) {
    const sql = 'SELECT * FROM login_tables WHERE user_email = ? AND user_pass = ?';
    const values = [user_email, user_pass];

    try {
      const result = await query(sql, values);
      return result[0];
    } catch (err) {
      throw err;
    }
  }
}

export default User;
