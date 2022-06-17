require('dotenv').config();
const express = require('express');
const app = express();

// Setup your Middleware and API Router here
const { client } = require('./db');
client.connect();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res) => {
  console.error(err.message);
  res.status(500).send('Request failed with status code 500');

  return err;
});

module.exports = app;
