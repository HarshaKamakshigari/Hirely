import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'renee.hayes@ethereal.email',
    pass: 'WdgwdkeX6SX5XHwM85',
  },
});

export async function sendVerificationEmail(email, verificationToken) {
  await transporter.sendMail({
    from: 'no-reply@jobportal.com',
    to: email,
    subject: 'Verify Your Email',
    html: `<a href="http://localhost:5000/auth/verify-email?token=${verificationToken}">Verify Email</a>`,
    date: new Date().toISOString(), // Reflect current date
  });
}