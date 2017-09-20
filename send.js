var amqp = require('amqplib/callback_api');

// Creating a connection
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || 'Hello World.........';

    ch.assertQueue(q, {
      durable: true, // Look what is this
    });
    var count = 0;

    setInterval(() => {
      count += 1;

      ch.sendToQueue(q, new Buffer(count+msg), {
        persistent: true,
      });
      console.log('Sender Sent ', msg);
    }, 1000);

  });
});
