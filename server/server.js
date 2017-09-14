const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());

app.use((req, res, next) => {
  const origin = (req.headers.origin || '*');
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.writeHead('204', 'No Content', {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      'Access-Control-Allow-Headers': 'Token, Content-Type',
      'content-length': 0 });
    return res.end();
  }

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
  return next();
});

app.use(routes);

module.exports = app;
