const debug = require('debug')('amqplib-simple:util:logger');
const os = require('os');

const docDefaults = {
    service: null,
    hostname: os.hostname(),
  }

function sendLog (conn, document) {
    debug('Sending log for doc %s', document)
    conn.channel.publish(
        'production', 'monitoring',
        Buffer.from(JSON.stringify(document)), { persistent: true },
      );
    return true;
}

function customLog (conn, type, obj) {
    const doc = obj;
    doc.service = docDefaults.service;
    doc.timeLog = Date.now();
    doc.type = type;
    return sendLog(conn, doc);
}

function Logger(options) {
    debug('%s enabled', options.service);
    docDefaults.service = options.service;
    this.customLog = customLog;

    return this;
}

module.exports = Logger;