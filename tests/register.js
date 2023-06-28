const User = require('../models/register');

(async function() {
  try {
    // Teste de registro de usuário
    const newUser = new User('aaa', 'teste@teste.com', '123456');
    const userId = await newUser.register();
    console.log(`Novo usuário registrado com ID ${userId}`);

    // Teste de login de usuário
    // const user = await User.login('asd@teste.com', '123456');
    // console.log(`Usuário logado: ${user.user_name} (${user.user_email})`);

  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
})();
