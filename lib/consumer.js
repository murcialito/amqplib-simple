

const debug = require('debug')('amqplib-simple:queue:consumer');
const Logger = require('../util/logger');
const config = require('config');

const logger = Logger({ service: config.name });

const consume = (conn, resolver) => conn.channel.consume(conn.queue, (msg) => {
  if (!(msg && msg.content)) {
    throw new Error('Bad message.');
  }
  const content = JSON.parse(msg.content.toString());
  logger.customLog(conn, 'NewMessageReceived', content);
  return resolver(msg)
    .then(() => {
      logger(conn, 'MessageSuccess', content);
      debug('Message processed successfully, sending acknowledge...');
      return conn.channel.ack(msg);
    })
    .catch((err) => {
      logger.customLog(conn, 'MessageError', content);
      debug('Error processing message, requeueing: %s', err.message || JSON.stringify(err));
      return conn.channel.reject(msg, false);
    });
}, { noAck: false });

module.exports = {
  consume,
};
