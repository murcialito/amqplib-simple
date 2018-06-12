

const debug = require('debug')('amqplib-simple:queue:consumer');

const consume = (conn, resolver) => conn.channel.consume(conn.queue, (msg) => {
  if (!(msg && msg.content)) {
    throw new Error('Bad message.');
  }

  return resolver(msg)
    .then(() => {
      debug('Message processed successfully, sending acknowledge...');
      return conn.channel.ack(msg);
    })
    .catch((err) => {
      debug('Error processing message, requeueing: %s', err.message || JSON.stringify(err));
      return conn.channel.reject(msg, false);
    });
}, { noAck: false });

module.exports = {
  consume,
};
