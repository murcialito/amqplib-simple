const Connection = require('./lib/connection');
const Consumer = require('./lib/consumer');
const Publisher = require('./lib/publisher');
const Logger = require('./util/logger');

function AmqplibSimple(options) {
    this.logger;
    const { log, service, version, exchange, routingKey} = options;
    if(log){
        this.logger = Logger({ 
            service,
            version,
            exchange,
            routingKey,
        });
    }
    this.connection = Connection({ logger: this.logger });
    this.consumer = Consumer({ logger: this.logger });
    this.publisher = Publisher({ logger: this.logger });
    return this;
}
module.exports = AmqplibSimple;