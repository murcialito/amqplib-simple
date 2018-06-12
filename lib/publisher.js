

const debug = require('debug')('amqplib-simple:queue:publisher');

async function publishOne(msg, channel, exchangeName, queueName) {
  try {
    debug(' [x] Publishing message in %s exchange for %s queue.', exchangeName, queueName);
    debug('Message is: %s', JSON.stringify(msg));
    const message = await channel.publish(
      exchangeName, queueName,
      Buffer.from(JSON.stringify(msg)), { persistent: true },
    );
    debug('Message inserted successfully? %s', message);
    return message;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  publishOne,
};
