const { transporter } = require("../config/email");
require("dotenv").config();

async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };
