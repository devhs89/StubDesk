const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const adminRouter = require('./routes/adminRouter');
const mongooseConnect = require('./data/dbContext');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Open MongoDb Connection
mongooseConnect().catch((e) => console.log(e));

// Use admin router middleware
app.use('/admin', adminRouter);

module.exports = app;
