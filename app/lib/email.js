import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(email, slot, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Booking",
    text: `You requested to book: ${slot}\n\nYour verification code is: ${otp}\n\nEnter this code in chat to confirm.`,
  });
}

export async function sendConfirmationEmail(email, slot) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Booking Confirmed ✅",
    text: `Your booking for ${slot} is confirmed! 🎉`,
  });
}
