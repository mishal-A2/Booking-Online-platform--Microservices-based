const amqp = require("amqplib");

async function sendMessage(bookingDetails) {
  try {
    console.log("Connecting to RabbitMQ...");
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "booking_notifications";

    await channel.assertQueue(queue, { durable: true });

    const message = {
      booking_id: bookingDetails.booking_id,
      user_id: bookingDetails.user_id, 
      status: "CONFIRMED",
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log("Message sent to queue:", message);

    setTimeout(() => {
      connection.close();
      console.log("RabbitMQ connection closed");
    }, 500);
  } catch (error) {
    console.error("RabbitMQ Publish Error:", error);
  }
}

module.exports = sendMessage;
