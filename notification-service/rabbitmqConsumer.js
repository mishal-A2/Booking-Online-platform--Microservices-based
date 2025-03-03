//listening for booking messages
const amqp = require("amqplib");
const sendEmail = require("./sendEmail");

const QUEUE_NAME = "booking_notifications";

const startRabbitMQConsumer = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Listening for messages on queue: ${QUEUE_NAME}`);
    
    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const bookingData = JSON.parse(msg.content.toString());
        console.log("Received booking:", bookingData);

        // Send notification (email in this case)
        await sendEmail(bookingData.user_id, bookingData.booking_id);

        // Acknowledge message
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("RabbitMQ Consumer Error:", error);
  }
};

module.exports = startRabbitMQConsumer;
