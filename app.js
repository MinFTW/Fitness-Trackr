const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const client = require('./db/client');
const app = express();

require('dotenv').config();

// Middleware and API Router
client.connect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api', require('./api'));

module.exports = app;
