
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
// var expressValidator = require('express-validator');
// var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var authRouter = require('./routes/auth');
var hackerRouter = require('./routes/hacker');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use('/auth', authRouter);

app.use('/hacker', hackerRouter);

app.listen(8081, function () {
  console.log("server listening at port 8081...");
});

module.exports = app;
