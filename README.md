# amqplib-simple

[![Coverage Status](https://coveralls.io/repos/murcialito/amqplib-simple/badge.svg?branch=master)](https://coveralls.io/repos/murcialito/amqplib-simple/badge.svg?branch=master)


Simple interface to stablsis a connection, publish and consume messages based on configuration.

Install it using npm:

        npm i amqplib-simple

Create a new instance:

        const amqplibSimple = require('amqplib-simple')

Connection can be stablished with connect method, and the same connection can be closed using the close method or directly calling the close mehtod inside the connection object.

        const { connect } = amqplibSimple.connection

        connect(
            amqplibInstance, connString, exchangeName,
            exchangeType, queueName, queueArgs, routingKey
        )

Consumer offers a method to consume messages using a given async resolver function

        const { consume } = amqplibSimple.consumer
        const customResolver = () => Promise.resolve()

        consume(connection, customResolver)

Publisher offers a method to publish a new message for given channel

        const { publishOne } = amqplibSimple.publisher

        publishOne(msg, channel, exchangeName, queueName)
