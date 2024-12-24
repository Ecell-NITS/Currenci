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

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email to client:", error.message);
        reject(new Error("Error sending email to client"));
      } else {
        console.log("Email sent successfully to client", info.response);
        resolve(info.response);
      }
    });
  });
};

export default sendEmail;
