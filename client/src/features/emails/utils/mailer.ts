import nodemailer from 'nodemailer';

const mailer = async (to: any, subject: any, html: any) => {
  let feedback = { status: '', message: 'No feedback' };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"DavTech" <davtechcode@gmail.com>',
    subject,
    html,
    to,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    feedback = { status: 'success', message: info.messageId };
  } catch (error: any) {
    feedback = { status: 'error', message: error.message };

    if (error.code === 'ECONNECTION') {
      feedback = {
        status: 'error',
        message: 'Failed to connect to the email server',
      };
    } else if (error.code === 'EAUTH') {
      feedback = {
        status: 'error',
        message: 'Failed to authenticate with the email server',
      };
    } else if (error.code === 'EENVELOPE') {
      feedback = {
        status: 'error',
        message: 'Invalid email recipient address',
      };
    } else {
      feedback = {
        status: 'error',
        message: `Failed to send email: ${error.message}`,
      };
    }
  }

  return feedback;
};

export default mailer;
