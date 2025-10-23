/**
 * Minimal SMTP test using nodemailer.
 * Reads SMTP_* env vars from process.env or .env.local (dotenv is used if available).
 * Required env vars:
 * - SMTP_HOST
 * - SMTP_PORT
 * - SMTP_USER
 * - SMTP_PASS
 * - SMTP_FROM
 * - CONTACT_RECEIVER_EMAIL
 */

try { require('dotenv').config({ path: '.env.local' }) } catch (e) {}

async function main() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_RECEIVER_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_RECEIVER_EMAIL) {
    console.error('Missing SMTP_* env vars or CONTACT_RECEIVER_EMAIL')
    process.exit(1)
  }

  const nodemailer = require('nodemailer')

  // Timeouts (milliseconds) to fail fast during local testing
  const connectionTimeout = 10000 // 10s
  const greetingTimeout = 10000
  const socketTimeout = 20000

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    connectionTimeout,
    greetingTimeout,
    socketTimeout,
  })

  // Print a masked config summary for debugging (no secrets)
  console.log('SMTP test config:', {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    user: SMTP_USER,
    from: SMTP_FROM,
    to: CONTACT_RECEIVER_EMAIL,
  })

  const msg = {
    from: SMTP_FROM,
    to: CONTACT_RECEIVER_EMAIL,
    subject: 'SMTP test from local project',
    text: 'This is a test via SMTP using nodemailer.',
    html: '<p>This is a test via <strong>SMTP</strong> using nodemailer.</p>'
  }

  try {
    // Verify connection first for clearer errors
    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection verified — attempting send...')
    const info = await transporter.sendMail(msg)
    console.log('SMTP send success:')
    console.log(info)
  } catch (err) {
    // Nodemailer error objects can be nested; print helpful fields
    if (err && err.code) console.error('Error code:', err.code)
    if (err && err.response) console.error('SMTP response:', err.response)
    console.error('Full error:')
    console.error(err)
    process.exit(1)
  }
}

main()
