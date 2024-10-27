const amqp = require('amqplib');

async function listenForNotifications() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  const queue = 'notificacoes';

  await channel.assertQueue(queue);
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      console.log('Notificação enviada:', notification);
      channel.ack(msg);
    }
  });
}

module.exports = { listenForNotifications };
