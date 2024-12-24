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

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email to admin:", error.message);
        reject(new Error("Error sending email to admin"));
      } else {
        console.log("Email sent successfully to admin:", info.response);
        resolve(info.response);
      }
    });
  });
};

export default sendEmailToAdmin;
