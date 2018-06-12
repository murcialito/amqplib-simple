/* global expect, config, it, describe */


const publisher = require('./publisher');


describe('Consumer module', () => {
  const fakeChannel = {
    publish: () => true,
  };

  it('Module returns an object', () => {
    publisher.should.be.an('object');
  });
  describe('publishOne method', () => {
    it('method is available', () => {
      publisher.publishOne.should.be.a('function');
    });
    it('method accepts four arguments', () => {
      publisher.publishOne.length.should.equal(4);
    });
    it('method returns true after message publication.', async () => {
      expect(await publisher.publishOne({}, fakeChannel, config.rabbitmq.order)).to.equal(true);
    });
    it('method throws exception when channel is not correct.', async () => {
      // eslint-disable-next-line  no-unused-expressions
      expect(publisher.publishOne(
        {}, () => {}, // eslint-disable-line  no-unused-expressions
        config.rabbitmq.order,
      )).to.be.rejected;
    });
    it('method throws exception when message is not JSON.', async () => {
      // eslint-disable-next-line  no-unused-expressions
      expect(publisher.publishOne(
        () => {}, fakeChannel,
        config.rabbitmq.order,
      )).to.be.rejected;
    });
  });
});
