/**
 * Test plain SMTP without TLS for Afrihost
 */

try { require('dotenv').config({ path: '.env.local' }) } catch (e) {}

async function main() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_RECEIVER_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_RECEIVER_EMAIL) {
    console.error('Missing SMTP_* env vars or CONTACT_RECEIVER_EMAIL')
    process.exit(1)
  }

  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 25,
    secure: false, // Force no SSL
    requireTLS: false, // Force no TLS
    ignoreTLS: true, // Ignore TLS completely
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  })

  console.log('Afrihost plain SMTP test config:', {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 25,
    secure: false,
    requireTLS: false,
    ignoreTLS: true,
    user: SMTP_USER,
    from: SMTP_FROM,
    to: CONTACT_RECEIVER_EMAIL,
  })

  console.log('Verifying plain SMTP connection...')
  try {
    await transporter.verify()
    console.log('✅ SMTP connection successful!')
    
    console.log('Sending test email...')
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_RECEIVER_EMAIL,
      subject: 'Afrihost SMTP Test',
      text: 'This is a test email from Afrihost SMTP',
    })
    
    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
  } catch (error) {
    console.log('Error code:', error.code)
    if (error.response) {
      console.log('SMTP response:', error.response)
    }
    console.log('Full error:')
    console.log(error)
  }
}

main().catch(console.error)