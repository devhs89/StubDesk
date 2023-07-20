const path = require('path');

// Webpack config (source: Pro MERN Stack, author: Vasan Subramanian)
const browserConfig = {
  mode: 'development', entry: {app: ['./src/index.js']}, output: {
    filename: 'app.bundle.js', path: path.resolve(__dirname, 'public'), publicPath: '/',
  }, module: {
    rules: [{
      test: /\.jsx?$/i, exclude: /node_modules/, use: {
        loader: 'babel-loader', options: {
          presets: [['@babel/preset-env', {
            targets: {
              ie: '11', edge: '15', safari: '10', firefox: '50', chrome: '49',
            }
          }], ['@babel/preset-react', {"runtime": "automatic"}]]
        }
      }
    }, {
      test: /\.css$/i, exclude: /node_modules/, use: ['style-loader', 'css-loader']
    }]
  }
};

module.exports = [browserConfig];
