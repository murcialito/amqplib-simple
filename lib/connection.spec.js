/* global it, config, expect, describe */


const consumer = require('./connection');

const closeConnection = {
  close: () => Promise.resolve(true),
};

const rabbitMock = {
  connect: () => {
    const connection = {
      createChannel: () => Promise.resolve({
        prefetch: () => Promise.resolve(true),
        assertExchange: () => Promise.resolve(true),
        assertQueue: () => Promise.resolve(true),
        bindQueue: () => Promise.resolve(true),
      }),

    };
    return Promise.resolve(connection);
  },
};

const rabbitMockFackeChannelError = {
  connect: () => {
    const connection = {
      createChannel: () => Promise.reject(new Error('Fake channel error.')),

    };
    return Promise.resolve(connection);
  },
};

describe('Connection module', () => {
  it('Module returns an object', () => {
    consumer.should.be.an('object');
  });
  describe('connect method', () => {
    it('is available', () => {
      consumer.connect.should.be.a('function');
    });
    it('accepts seven arguments', () => {
      consumer.connect.length.should.equal(7);
    });
    it('connects to the given rabbit instance', async () => {
      const conn = await consumer.connect(
        rabbitMock,
        `amqp://${config.rabbitmq.connection.user}:${config.rabbitmq.connection.pass}@${config.rabbitmq.connection.host}:${config.rabbitmq.connection.port}/${config.rabbitmq.connection.vhost}`, // eslint-disable-line max-len
        config.rabbitmq.exchange.name,
        config.rabbitmq.exchange.type,
        config.rabbitmq.example.queue.name,
        {
          'x-dead-letter-exchange': config.rabbitmq.example.queue.arguments.dlx,
          'x-dead-letter-routing-key': config.rabbitmq.example.queue.arguments.dlxRoutingKey,
        },
        config.rabbitmq.example.routingKey,
      );
      return expect(conn).to.be.an('object');
    });
    it('connects to the given rabbit instance', async () => {
      try {
        await consumer.connect(
          rabbitMockFackeChannelError,
          `amqp://${config.rabbitmq.connection.user}:${config.rabbitmq.connection.pass}@${config.rabbitmq.connection.host}:${config.rabbitmq.connection.port}/${config.rabbitmq.connection.vhost}`, // eslint-disable-line max-len
        );
      } catch (err) {
        return expect(err.message).to.equal('Fake channel error.');
      }
    });
  });
  describe('close method', () => {
    it('is available', () => {
      consumer.close.should.be.a('function');
    });
    it('accepts 1 argument', () => {
      consumer.close.length.should.equal(1);
    });
    it('closes the connection on demand', () => expect(consumer.close(closeConnection)).to.eventually.equal(true));
  });
});
