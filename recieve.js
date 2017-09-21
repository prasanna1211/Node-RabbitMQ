var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var exchange = 'logs';

    ch.assertExchange(exchange, 'fanout', {
      durable: false,
    });

    ch.assertQueue('', { exclusive: true }, function(err, q) {
      console.log('Waiting for messages ', q.queue);
      ch.bindQueue(q.queue, exchange, '');

      ch.consume(q.queue, function(msg) {
        console.log(' recieved ', msg.content.toString());
      }, { noAck: true });
    });
  });
});
