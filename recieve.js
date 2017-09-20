var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    ch.assertQueue(q, {
      durable: false,
    });
    console.log('Waiting for messages from queue');
    ch.consume(q, function(msg) {
      console.log('Recieved message from queue : ', msg.content.toString());
    }, {
      noAck: true,
    });
  });
})
