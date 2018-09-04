

const debug = require('debug')('amqplib-simple:queue:consumer');

function Consumer(opts) {
  const { logger } = opts;
  this.consume = (conn, resolver) => conn.channel.consume(conn.queue, (msg) => {
    if (!(msg && msg.content)) {
      throw new Error('Bad message.');
    }
    const content = JSON.parse(msg.content.toString());
    if(logger) {
      debug('Logger is enabled, sending feed for NewMessageReceived...');
      logger.customLog(conn, 'NewMessageReceived', content);
    }
    return resolver(msg)
      .then(() => {
        if(logger) {
          debug('Logger is enabled, sending feed for MessageSuccess...');
          logger(conn, 'MessageSuccess', content);
        }
        debug('Message processed successfully, sending acknowledge...');
        return conn.channel.ack(msg);
      })
      .catch((err) => {
        if(logger) {
          debug('Logger is enabled, sending feed for MessageError...');
          logger.customLog(conn, 'MessageError', content);
        }
        debug('Error processing message, requeueing: %s', err.message || JSON.stringify(err));
        return conn.channel.reject(msg, false);
      });
  }, { noAck: false });

  return this;
}

module.exports = Consumer;
