const pool = require('./db');
const amqp = require('amqplib');

async function processPayment(transactionId) {
  await pool.query("UPDATE transactions SET status='sucesso' WHERE id=$1", [transactionId]);
  await notifyPaymentStatus(transactionId, 'sucesso');
}

async function notifyPaymentStatus(transactionId, status) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  const queue = 'notificacoes';

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify({ transactionId, status })));
  
  setTimeout(() => connection.close(), 500);
}

module.exports = { processPayment };


