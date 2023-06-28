// Importe as dependências necessárias
const bcrypt = require('bcrypt');
const connection = require('../config/database'); // Importe o arquivo de configuração do banco de dados

class Register {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async validate() {
    // Validação do nome
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (this.username.length < 4 || !usernameRegex.test(this.username)) {
      throw new Error('Nome de usuário inválido. O nome deve ter pelo menos 4 letras e não pode começar com números ou conter espaços.');
    }

    // Verifica se o nome de usuário já existe no banco de dados
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE user_name = ?', [this.username]);
    const count = rows[0].count;
    if (count > 0) {
      throw new Error('Nome de usuário já existe. Escolha outro nome de usuário.');
    }

    // Verifica se o email já está cadastrado
    const [emailRows] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE user_email = ?', [this.email]);
    const emailCount = emailRows[0].count;
    if (emailCount > 0) {
      throw new Error('O email já está cadastrado. Use um email diferente.');
    }

    // Validação da senha
    if (this.password.length < 8) {
      throw new Error('A senha deve ter pelo menos 8 caracteres.');
    }
  }

  async save() {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Insere as informações do usuário no banco de dados
    await connection.execute('INSERT INTO users (user_name, user_email, user_pass) VALUES (?, ?, ?)', [
      this.username,
      this.email,
      hashedPassword
    ]);
  }
}

module.exports = Register;
