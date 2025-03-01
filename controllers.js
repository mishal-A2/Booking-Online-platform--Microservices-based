const { createBooking, getEventById, getUserById } = require("./models");
const sendMessage = require("./rabbitmqPublisher");

const bookEvent = async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    // Check if the event exists
    const event = await getEventById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user exists
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the booking
    const newBooking = await createBooking(user_id, event_id);

    // Send a message to RabbitMQ
    const message = {
      booking_id: newBooking.id,
      user_id,
      event_id,
      status: "CONFIRMED",
    };
    sendMessage(message);

    // Return success response
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookEvent };