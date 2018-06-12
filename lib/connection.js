
const debug = require('debug')('amqplib-simple:queue:connection');

async function connect(
  rabbit, connString, exchangeName,
  exchangeType, queueName, queueArgs, routingKey,
) {
  try {
    debug(
      'Connection request for exchangeName: %s, exchangeType: %s, queueName: %s, queueArgs: %s, routingKey: %s',
      exchangeName, exchangeType, queueName, JSON.stringify(queueArgs), routingKey,
    );
    const conn = await rabbit.connect(connString);
    const channel = await conn.createChannel();
    channel.prefetch(1);
    await channel.assertExchange(exchangeName, exchangeType, { durable: true });
    debug('Connection and channel created, asserting queue with args: %s', JSON.stringify(queueArgs));
    await channel.assertQueue(queueName, { arguments: queueArgs });

    const binding = await channel.bindQueue(
      queueName,
      exchangeName, routingKey,
    );

    debug('Queue asserted and binded.');

    return {
      conn,
      channel,
      queue: binding.queue,
    };
  } catch (err) {
    throw err;
  }
}

async function close(conn) {
  debug('Closing connection.');
  return conn.close();
}

module.exports = {
  connect,
  close,
};
