import nodemailer from "nodemailer";

export async function sendEmail(sender, subject, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // false for port 587 (STARTTLS), true for 465 (SSL/TLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY,
    },
  });

  const mailOptions = {
    // sender address (should match a verified sender in Brevo)
    from: `"${process.env.APP_NAME}" <${process.env.FROM_EMAIL}>`,
    to: sender,
    subject: subject,
    html: message,
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent! Message ID:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
