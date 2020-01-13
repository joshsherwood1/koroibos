var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];

var indexRouter = require('./routes/index');
var olympiansRouter = require('./routes/api/v1/olympians');
var olympiansStatsRouter = require('./routes/api/v1/olympian_stats');
var eventsRouter = require('./routes/api/v1/events');
var teamsRouter = require('./routes/api/v1/teams');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/olympians', olympiansRouter);
app.use('/api/v1/olympian_stats', olympiansStatsRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/teams', teamsRouter);

module.exports = app;
