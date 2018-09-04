

const debug = require('debug')('amqplib-simple:queue:publisher');
const config = require('config');
const Logger = require('../util/logger');

const logger = Logger({ service: config.name });

async function publishOne(msg, channel, exchangeName, queueName) {
  try {
    debug(' [x] Publishing message in %s exchange for %s queue.', exchangeName, queueName);
    debug('Message is: %s', JSON.stringify(msg));
    const message = await channel.publish(
      exchangeName, queueName,
      Buffer.from(JSON.stringify(msg)), { persistent: true },
    );
    debug('Message inserted successfully? %s', message);
    logger.customLog({ channel }, 'NewMessagePublished', msg);
    return message;
  } catch (err) {
    logger.customLog({ channel }, 'NewMessagePublishingError', msg);
    throw err;
  }
}

module.exports = {
  publishOne,
};
