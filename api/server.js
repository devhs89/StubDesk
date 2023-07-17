#!/usr/bin/env node

/**
 * Module dependencies.
 */
const express = require('express');
require('dotenv').config();
const {connectDb} = require('./data/dbContext');
const {apiHandler} = require("./api-handler");

const app = express();

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '30080';
app.set('port', port);

(async function start() {
  try {
    await connectDb();
    await apiHandler(app);
    app.use('*', (req, res) => res.redirect('/graphql'));
    app.listen(port, () => {
      console.log(`API server started on http://localhost:${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
