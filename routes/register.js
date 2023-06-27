const express = require('express');
const router = express.Router();
const Register = require('../models/register');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const register = new Register(username, email, password);
    await register.validate();
    await register.save();

    // Exibe a mensagem de sucesso como resposta na própria página
    res.send('<script>alert("Usuário registrado com sucesso!"); window.location.href = "/";</script>');
    } catch (error) {
    // Exibe a mensagem de erro como resposta na própria página
    res.send(`<script>alert("${error.message}"); window.location.href = "/";</script>`);
    }
});

module.exports = router;

    