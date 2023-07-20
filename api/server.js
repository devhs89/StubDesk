#!/usr/bin/env node

const express = require('express');
require('dotenv').config();
const {connectDb} = require('./data/dbContext');
const {apiHandler} = require("./api-handler");

// API server
const app = express();

const port = process.env.PORT || '30080';
app.set('port', port);

(async function start() {
  try {
    // make mongo db connection
    await connectDb();
    // use graphql api handler
    await apiHandler(app);
    // redirect any other routes to graphql for now
    app.use('*', (req, res) => res.redirect('/graphql'));
    // start express app
    app.listen(port, () => {
      console.log(`API server started on http://localhost:${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
