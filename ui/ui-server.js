const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

const options = {
  target: 'http://localhost:30080/graphql', changeOrigin: true
};

app.use('/graphql', proxy({target: 'http://localhost:30080/graphql'}));

app.use('/', express.static('public'));

app.listen(30081, function () {
  console.log('UI server started at http://localhost:30081/');
});