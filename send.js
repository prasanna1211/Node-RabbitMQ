var amqp = require('amqplib/callback_api');

// Creating a connection
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    var msg = 'Hello World.........';
    var exchange = 'logs';

    ch.assertExchange(exchange, 'fanout', {
      durable: false,
    });

    ch.publish(exchange, '', new Buffer(msg));
    console.log('published to logs with message : ', msg);

  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
