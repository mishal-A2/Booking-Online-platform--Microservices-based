//sending email
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (userId, bookingId) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: `user${userId}@example.com`,  // Replace with actual user email
      subject: "Booking Confirmation",
      text: `Your booking with ID ${bookingId} has been confirmed.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to user ${userId} for booking ${bookingId}`);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

module.exports = sendEmail;
