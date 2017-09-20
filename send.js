var amqp = require('amqplib/callback_api');

// Creating a connection
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    ch.assertQueue(q, {
      durable: false, // Look what is this
    });
    ch.sendToQueue(q, new Buffer('Hello World'));
    console.log('Sent Hello World');
  });
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 5000)
});
