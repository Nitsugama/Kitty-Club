const express = require('express');
const router = express.Router();
const Login = require('../models/login');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Cria uma instância do modelo de login
    const login = new Login(email, senha);

    // Realiza a autenticação, passando o objeto 'req'
    const user = await login.authenticate(req);

    // Salva os dados do usuário na sessão
    req.session.username = user.user_name;
    req.session.email = user.user_email;

    // Exibe mensagem de sucesso em um alert e redireciona para a página atual
    res.send(`<script>alert("Login bem-sucedido"); window.location.href = "${req.headers.referer}";</script>`);

    console.log('Sessão definida:', req.session ? true : false);
    // Mostra o nome do usuário da sessão no console
    console.log('Nome do usuário da sessão:', req.session.username);
  } catch (error) {
    // Exibe mensagem de erro em um alert e redireciona para a página atual
    res.send(`<script>alert("${error.message}"); window.location.href = "${req.headers.referer}";</script>`);
  }
});

module.exports = router;
