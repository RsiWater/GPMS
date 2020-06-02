
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var mainRouter = require('./routes/main');
var TrRouter = require('./routes/TaiwanRailway');
var BusRouter = require('./routes/Bus');
var HRSRouter = require('./routes/HSpeed');
var LoginRouter = require('./routes/Login');
var LoginCheckRouter = require('./routes/Login_check')
var AdminRouter = require('./routes/Admin')
var TicketRouter = require('./routes/Ticket');
var IdentifierRouter = require('./routes/Identifier');
var LoadingRouter = require('./routes/Loading');
var FastOrderRouter = require('./routes/FastOrder');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/main', mainRouter);
app.use('/main/TaiwanRailway', TrRouter);
app.use('/main/Bus', BusRouter);
app.use('/main/HSpeed', HRSRouter);
app.use('/main/Login', LoginRouter);
app.use('/main/Login_check', LoginCheckRouter);
app.use('/main/Identifier', IdentifierRouter);
app.use('/main/Admin', AdminRouter);
app.use('/main/Ticket', TicketRouter);
app.use('/main/Loading', LoadingRouter);
app.use('/main/FastOrder', FastOrderRouter);

app.use(express.static(path.join(__dirname, '/public')));

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

//GET

app.get('/', function(req,res,next)
{
  console.log('Get fom TaiwanRailway.html');
  res.send('ttttt')
})


module.exports = app;
