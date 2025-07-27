import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(email, slot) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: `"Meeting Scheduler" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Meeting Confirmation',
    html: `<p>Your meeting is booked for <strong>${slot}</strong>.</p>`,
  });
}
