'use strict';

const amqplibSimple = require('../index');

describe('Amqplib Simple', () => {
    it('Module returns an object', () => {
        amqplibSimple.should.be.an('object');
      });
        describe('connection object', () => {
            it('is available', () => {
                amqplibSimple.connection.should.be.an('object');
            });
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
            it('is available', () => {
                amqplibSimple.consumer.should.be.an('object');
            });
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
            it('is available', () => {
                amqplibSimple.publisher.should.be.an('object');
            });
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