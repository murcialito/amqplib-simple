'use strict';

const connection = require('./lib/connection');
const consumer = require('./lib/consumer');
const publisher = require('./lib/publisher');

module.exports = {
    connection,
    consumer,
    publisher
}