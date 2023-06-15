const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const adminRouter = require('./routes/adminRouter');

const app = express();

// Allow cross-origin requests for client app
app.use(cors({
  origin: 'http://localhost:3000', optionsSuccessStatus: 200
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use admin router middleware
app.use('/admin', adminRouter);

module.exports = app;
