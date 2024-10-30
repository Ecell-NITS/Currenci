import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_CURRENCI,
    pass: process.env.EMAIL_PWD_CURRENCI,
  },
});

const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_CURRENCI,
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendEmail;
