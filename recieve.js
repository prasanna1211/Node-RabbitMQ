var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    ch.assertQueue(q, {
      durable: true,
    });
    console.log('Waiting for messages from queue');
    ch.consume(q, function(msg) {
      var delaySeconds = msg.content.toString().split('.').length - 1;
      console.log('Recieved ', msg.content.toString());
      setTimeout(function() {
        console.log('done the task ', msg.content.toString());
      }, delaySeconds * 1000);
    }, {
      noAck: false,
    });
  });
})
