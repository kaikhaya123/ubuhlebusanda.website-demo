/**
 * SendGrid quick test script.
 * Usage:
 *   1) Set env vars in your shell or in .env.local and `setlocal` them into environment.
 *      - SENDGRID_API_KEY
 *      - SENDGRID_FROM_EMAIL (optional; defaults to CONTACT_RECEIVER_EMAIL)
 *      - CONTACT_RECEIVER_EMAIL
 *   2) Run: node scripts/sendgrid_test.js
 */

// Load .env.local if present so the script works when run directly
try {
  require('dotenv').config({ path: '.env.local' })
} catch (e) {
  // dotenv might not be installed yet; we'll handle that at runtime
}

async function main() {
  const sgKey = process.env.SENDGRID_API_KEY
  const to = process.env.CONTACT_RECEIVER_EMAIL
  const from = process.env.SENDGRID_FROM_EMAIL || to
  if (!sgKey) {
    console.error('SENDGRID_API_KEY not set')
    process.exit(1)
  }
  if (!to) {
    console.error('CONTACT_RECEIVER_EMAIL not set')
    process.exit(1)
  }
  const sg = require('@sendgrid/mail')
  sg.setApiKey(sgKey)
  const msg = {
    to,
    from,
    subject: 'SendGrid test — ubuhlebusanda',
    text: 'This is a SendGrid test from your local project. If you received this, SendGrid is configured.',
    html: '<p>This is a <strong>SendGrid</strong> test from your local project.</p>'
  }
  try {
    const res = await sg.send(msg)
    console.log('SendGrid response status:', res && res[0] && res[0].statusCode)
    console.log('Headers:', res && res[0] && res[0].headers)
  } catch (err) {
    console.error('SendGrid send error:', err && err.response && err.response.body ? err.response.body : err)
    process.exit(1)
  }
}

main()
