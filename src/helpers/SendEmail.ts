import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_CURRENCI,
    pass: process.env.EMAIL_PWD_CURRENCI,
  },
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_CURRENCI,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    if (
      error.responseCode === 421 ||
      error.responseCode === 450 ||
      error.responseCode === 451
    ) {
      return {
        success: false,
        error: "The email server might be down. Please try again later.",
      };
    }

    return { success: false, error: "Error sending email" };
  }
};

export default sendEmail;
