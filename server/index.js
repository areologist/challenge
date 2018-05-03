/* eslint-disable no-global-assign */
require = require('esm')(module);
require('dotenv').config();

module.exports = require('./web/index.js');
