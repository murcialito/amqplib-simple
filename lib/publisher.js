

const debug = require('debug')('amqplib-simple:queue:publisher');

function Publisher(opts) {
  const { logger } = opts;
  this.publishOne = async function publishOne(msg, channel, exchangeName, queueName) {
    try {
      debug(' [x] Publishing message in %s exchange for %s queue.', exchangeName, queueName);
      debug('Message is: %s', JSON.stringify(msg));
      const message = await channel.publish(
        exchangeName, queueName,
        Buffer.from(JSON.stringify(msg)), { persistent: true },
      );
      debug('Message inserted successfully? %s', message);
      if(logger) {
        try {
          debug('Logger is enabled, sending feed for NewMessagePublished...');
          logger.customLog({ channel }, 'NewMessagePublished', msg);
        } catch (error) {
          debug(error);
        }
      }  
      return message;
    } catch (err) {
      if(logger) {
        try {
          debug('Logger is enabled, sending feed for NewMessagePublishingError...');
          logger.customLog({ channel }, 'NewMessagePublishingError', msg);
        } catch (error) {
          debug(error);
        }
        
      }
      throw err;
    }
  };

  return this;
};


module.exports = Publisher;
