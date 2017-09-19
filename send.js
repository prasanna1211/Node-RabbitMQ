var amqpb = require('amqplib/callback_api');

amqpb.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    ch.assertQueue(q, {
      durable: false
    });
    ch.sendToQueue(q, new Buffer('Hello World !'));
    console.log(' [x] Sent "Hello World"');
  });
  setTimeout(function() {
    conn.close();
    process.exit(0)
  }, 500);
});
