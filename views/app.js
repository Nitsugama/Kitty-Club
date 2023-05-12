const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Rotas para navegação nos arquivos
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const secretRouter = require('./routes/secret');
const comunityRouter = require('./routes/community');
const videoPlayer = require('./routes/videoPlayer');
const app = express();

//configuração do renderizador das paginas html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rotas para navegação na url
app.use('/', indexRouter);
app.use('/perfil', profileRouter);
app.use('/4444', secretRouter);
app.use('/comunidade', comunityRouter);
app.use('/video/:id', videoPlayer);
//imagens estaticas
app.use(express.static('public'));

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
