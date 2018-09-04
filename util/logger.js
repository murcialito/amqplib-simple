const debug = require('debug')('amqplib-simple:util:logger');
const os = require('os');

const docDefaults = {
    hostname: os.hostname(),
  }

const publishTo = {
    exchange: null,
    routingKey: null,
}

function sendLog (conn, document) {
    debug('Sending log for doc %j', document)
    conn.channel.publish(
        publishTo.exchange, publishTo.routingKey,
        Buffer.from(JSON.stringify(document)), { persistent: true },
      );
    return true;
}

function customLog (conn, type, obj) {
    const doc = JSON.parse(JSON.stringify(obj));
    doc.service = docDefaults.service;
    doc.timeLog = Date.now();
    doc.type = type;
    return sendLog(conn, doc);
}

function Logger(options) {
    const { service, version, exchange, routingKey } = options;
    debug('%s enabled', options.service);
    docDefaults.service = service;
    docDefaults.version = version;
    publishTo.exchange = exchange;
    publishTo.routingKey = routingKey;
    this.customLog = customLog;

    return this;
}

module.exports = Logger;