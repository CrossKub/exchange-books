const ConsulPilot = require('consul-pilot');
const rabbit = require('rmq-exchange');

if (process.env.NODE_ENV !== 'test') {
    ConsulPilot.watch(process.env.RABBITMQ_SERVICE, (err, service) => {
        if (err) console.error(err);

        console.log('New RabbitMQ connection reported', service);

        if (service.address) {
            rabbit.close()
                .then(() => {
                    return rabbit.connect(service.address)
                        .then(() => {
                            rabbit.create();
                        })
                        .catch(err => { throw err; });
                });
        }
    }).catch(console.error);
}

module.exports = rabbit;
