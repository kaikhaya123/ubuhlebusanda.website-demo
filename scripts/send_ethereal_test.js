const nodemailer = require('nodemailer');

async function run() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal account created.');

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const to = process.env.CONTACT_RECEIVER_EMAIL || 'test@example.com';
    const info = await transporter.sendMail({
      from: `Ethereal Test <${testAccount.user}>`,
      to,
      subject: 'Ethereal test message from ubuhlebusanda',
      text: 'This is a test message sent using nodemailer Ethereal test account.',
      html: '<p>This is a <strong>test</strong> message sent using nodemailer Ethereal test account.</p>',
    });

    console.log('Message sent. MessageId:', info.messageId);
    const preview = nodemailer.getTestMessageUrl(info);
    console.log('Preview URL:', preview);
  } catch (err) {
    console.error('Error sending test email:', err);
    process.exit(1);
  }
}

run();
