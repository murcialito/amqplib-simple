/* global it, expect, data, describe */


const Consumer = require('./consumer');

const logger = require('../util/logger')({
  service: 'aservicename',
  version: 'aserviceversion',
  exchange: 'aexchangename',
  routingKey: 'aroutingkey',
});
const consumer = Consumer({ logger });

describe('Consumer module', () => {
  const customResolver = () => Promise.resolve();
  const customFailResolver = () => Promise.reject({ error: new Error('Fake resolver error.') }); // eslint-disable-line

  const fakeConn = {
    channel: {
      consume: (queue, cb) => {
        cb({ content: Buffer.from(JSON.stringify(data.oportunities.buy)) });
      },
      publish: () => true,
      ack: () => true,
    },
  };

  const fakeConnBadConsume = {
    channel: {
      consume: (queue, cb) => {
        cb();
      },
      publish: () => true,
    },
  };

  const fakeConnBadAck = {
    channel: {
      consume: (queue, cb) => {
        cb({ content: Buffer.from(JSON.stringify(data.oportunities.buy)) });
      },
      publish: () => true,
      reject: () => true,
      ack: () => Promise.reject(new Error('Bad ack.')),
    },
  };

  describe('consume method', () => {
    it('accepts two arguments', () => consumer.consume.length.should.equal(2));

    it('starts a consumer with given resolver', () => consumer.consume(fakeConn, customResolver));

    it('Throws an error when the message is invalid', () =>
      expect(() => consumer.consume(fakeConnBadConsume, customResolver)).to.throw(Error, 'Bad message.'));

    it('Rejects the message when the ack fails', () => consumer.consume(fakeConnBadAck, customResolver));

    it('Rejects the message when the resolver fails', () => consumer.consume(fakeConnBadAck, customFailResolver));
  });
});
