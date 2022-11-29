const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/v1/api/users', require('./routes/usersRouter'));
app.use('/v1/api/box', require('./routes/boxRouter'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
    if (err) {
        res.status(400).json(err);
    }
});

module.exports = app;
