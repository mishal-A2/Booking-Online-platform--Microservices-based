const amqp = require("amqplib");
const sendEmail = require("./emailSender");
require("dotenv").config();

async function consumeMessages() {
  try {
    console.log("📡 Connecting to RabbitMQ...");
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "booking_notifications";

    await channel.assertQueue(queue, { durable: true });

    console.log(` Waiting for messages in queue: ${queue}...`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log(" Received:", messageContent);

        const { booking_id, user_id, status } = messageContent;

        if (!user_id) {
          console.error(" Missing user ID, cannot fetch email.");
          channel.ack(msg);
          return;
        }

        console.log(` Fetching email for User ID: ${user_id}`);
        await sendEmail(user_id, { booking_id, user_id, status });

        channel.ack(msg);
      }
    });

  } catch (error) {
    console.error(" RabbitMQ Consumer Error:", error);
  }
}

module.exports = consumeMessages;
