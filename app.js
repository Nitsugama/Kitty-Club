const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

//Rotas para navegação nos arquivos
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const secretRouter = require('./routes/secret');
const comunityRouter = require('./routes/community');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// VIDEOPLAYER CARREGA OS VIDEOS COM LINKS
const videoPlayer = require('./routes/videoPlayer');
const app = express();

// Configuração do express-session
app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: true
}));

//configuração do renderizador das paginas html
app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.session.username ? true : false;
  res.locals.username = req.session.username;
  next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(registerRouter);
app.use(loginRouter);

//Rotas para navegação na url
app.use('/', indexRouter);
app.use('/perfil', profileRouter);
app.use('/4444', secretRouter);
app.use('/comunidade', comunityRouter);
app.use('/video', videoPlayer);
//imagens estaticas
app.use(express.static('public'));

app.get('/logout', function(req, res) {
  // Limpa os dados da sessão
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    // Redireciona o usuário para a página inicial após o logout
    res.redirect('/');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
