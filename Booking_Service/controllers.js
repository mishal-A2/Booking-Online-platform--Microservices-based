const { createBooking, getEventById, getUserById, getEventAvailability } = require("./models");
const sendMessage = require("./rabbitmqPublisher");
const axios = require("axios");

const bookEvent = async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    console.log(`Checking user ID: ${user_id}`);
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found in User Service" });
    }

    console.log(`Checking event ID: ${event_id}`);
    const event = await getEventById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found in Event Service" });
    }


    // Step 4: Deduct 1 slot from the event availability in the Event Service
    const updatedEvent = await axios.put(`${process.env.EVENT_SERVICE_URL}/events/${event_id}/book`, { count: 1 });
    if (updatedEvent.data.capacity === 0) {
      await axios.put(`${process.env.EVENT_SERVICE_URL}/events/${event_id}/status`, { booked: 1 });
  }
    
    const newBooking = await createBooking(user_id, event_id);

   const message = {
      booking_id: newBooking.id,
      user_email: user.email,
      user_phone: user.phone,
      status: "CONFIRMED",
    };

    sendMessage({
      booking_id: newBooking.id,
      user_id: user_id, 
    });

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error in bookEvent:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { bookEvent };
