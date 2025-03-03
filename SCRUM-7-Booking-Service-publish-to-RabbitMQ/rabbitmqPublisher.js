const amqp = require('amqplib');

const sendMessage = async (message) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'booking_notifications';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log('Sent:', message);
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

module.exports = sendMessage;