const express = require('express');
const proxy = require('http-proxy-middleware');

// UI server
const app = express();

const options = {
  target: 'http://localhost:30080/graphql', changeOrigin: true
};

// proxy all requests to graphql endpoint
app.use('/graphql', proxy({target: 'http://localhost:30080/graphql'}));

// serve static content
app.use('/', express.static('public'));

app.listen(30081, function () {
  console.log('UI server started at http://localhost:30081/');
});