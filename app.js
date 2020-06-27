
var createError = require('http-errors');	
var express = require('express');	
var path = require('path');	
var cookieParser = require('cookie-parser');	
var logger = require('morgan');	


var testRouter = require('./routes/test')
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/Login')
var systemManageRouter = require('./routes/systemManage');
var accountManageRouter = require('./routes/AccountManage');
var projectManageRouter = require('./routes/ProjectManage');
var informManageRouter = require('./routes/informManage');
var themePickerRouter = require('./routes/themePicker');
var teacherMainRouter = require('./routes/teacherMain');
var studentMainRouter = require('./routes/studentMain');
var passwordModifyRouter = require('./routes/passwordModify');
var userModifyPasswordRouter = require('./routes/userModifyPassword');
var myProjectTeamRouter = require('./routes/myProjectTeam');
var projectShowRouter = require('./routes/projectShow');
var projectExhibitionRouter = require('./routes/projectExhibition');
// var signinRouter = require('./routes/Sign_in');	

var app = express();	

// view engine setup	
app.set('views', path.join(__dirname, 'views'));	
app.set('view engine', 'ejs');	

app.use(logger('dev'));	
app.use(express.json());	
app.use(express.urlencoded({ extended: false }));	
app.use(cookieParser());	

app.use('/test', testRouter)
app.use('/', indexRouter);	
app.use('/login', loginRouter)
app.use('/systemManage', systemManageRouter)
app.use('/systemManage/accountManage', accountManageRouter)
app.use('/systemManage/accountManage/passwordModify', passwordModifyRouter)
app.use('/systemManage/projectManage', projectManageRouter)
app.use('/systemManage/projectManage/projectShow', projectShowRouter)
app.use('/systemManage/informManage', informManageRouter)
app.use('/systemManage/themePicker', themePickerRouter)
app.use('/systemManage/userModifyPassword', userModifyPasswordRouter)
app.use('/systemManage/exhibit', projectExhibitionRouter)
app.use('/teacherMain', teacherMainRouter)
app.use('/teacherMain/userModifyPassword', userModifyPasswordRouter)
app.use('/teacherMain/projectManage', projectManageRouter)
app.use('/teacherMain/myProjectTeam', myProjectTeamRouter)
app.use('/studentMain', studentMainRouter)
app.use('/studentMain/projectManage', projectManageRouter)
app.use('/studentMain/userModifyPassword', userModifyPasswordRouter)
app.use('/studentMain/projectManage/projectShow', projectShowRouter)
app.use('/guest/projectManage', projectManageRouter)

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
  console.log(err)
  res.render('error');	
});	

//GET	

app.get('/', function(req,res,next)	
{	
  console.log('Get fom TaiwanRailway.html');	
  res.send('ttttt')	
})	


module.exports = app;