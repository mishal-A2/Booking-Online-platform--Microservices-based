const nodemailer = require("nodemailer");
const axios = require("axios");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Fetches the user's email using User Service API.
 * @param {number} userId 
 * @returns {string}
 */
async function getUserEmail(userId) {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/id/${userId}`);
    return response.data.email;
  } catch (error) {
    console.error(`Failed to fetch email for user ${userId}:`, error.message);
    return null;
  }
}

/**
 * Sends an email notification.
 * @param {number} userId 
 * @param {object} bookingDetails 
 */
async function sendEmail(userId, bookingDetails) {
  try {
    const userEmail = await getUserEmail(userId);
    if (!userEmail) {
      console.error("No email found, skipping email notification.");
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: "Booking Confirmation",
      text: `Dear User,\n\nYour booking (ID: ${bookingDetails.booking_id}) has been confirmed!\n\nEvent Details:\nUser ID: ${bookingDetails.user_id}\nStatus: ${bookingDetails.status}\n\nThank you for using our service!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}: ${info.response}`);
  } catch (error) {
    console.error(" Email sending failed:", error);
  }
}

module.exports = sendEmail;
