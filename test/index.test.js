'use strict';

const AmqplibSimple = require('../index');

const amqplibSimple = AmqplibSimple({ 
    log: true,
    service: 'aservicename',
    version: 'aserviceversion',
    exchange: 'aexchangename',
    routingKey: 'aroutingkey',
  });
describe('Amqplib Simple', () => {
        describe('connection object', () => {
            describe('connect method', () => {
                it('is available', () => {
                    amqplibSimple.connection.connect.should.be.a('function');
                });
                it('accepts seven arguments', () => {
                    amqplibSimple.connection.connect.length.should.equal(7);
                });
            });
            describe('close method', () => {
                it('is available', () => {
                    amqplibSimple.connection.close.should.be.a('function');
                });
                it('accepts one argument', () => {
                    amqplibSimple.connection.close.length.should.equal(1);
                });
            });
        });
        describe('consumer object', () => {
            describe('consume method', () => {
                it('is available', () => {
                    amqplibSimple.consumer.consume.should.be.a('function');
                });
                it('accepts two arguments', () => {
                    amqplibSimple.consumer.consume.length.should.equal(2);
                });
            });
        }); 
        describe('publisher method', () => {
            describe('publishOne method', () => {
                it('is available', () => {
                    amqplibSimple.publisher.publishOne.should.be.a('function');
                });
                it('accepts four arguments', () => {
                    amqplibSimple.publisher.publishOne.length.should.equal(4);
                });
            });
        }); 
})