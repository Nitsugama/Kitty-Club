const bcrypt = require('bcrypt');
const db = require('../config/database');

class Login {
  constructor(email, senha) {
    this.email = email;
    this.senha = senha;
  }

  async authenticate(req) { // Adicione o parâmetro 'req' para ter acesso à sessão
    try {
      const connection = await db.getConnection();

      const [rows, _] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [this.email]);

      if (rows.length === 0) {
        throw new Error('Email não cadastrado');
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(this.senha, user.user_pass);

      if (!isPasswordValid) {
        throw new Error('Senha incorreta');
      }

      // Definir a propriedade 'req.session.isAuthenticated' como 'true'
      req.session.isAuthenticated = true;

      connection.release();

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Login;
