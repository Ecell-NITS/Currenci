import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_CURRENCI,
    pass: process.env.EMAIL_PWD_CURRENCI,
  },
});

const sendEmailToAdmin = (subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_CURRENCI,
    to: process.env.CONTACT_EMAIL,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      throw new Error(error.message);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendEmailToAdmin;
