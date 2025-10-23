# Contact API setup and testing

This project exposes a contact API at `/api/contact` (Next.js App Router). The route accepts JSON POSTs and will attempt to deliver messages using SendGrid or SMTP.

## Payload shape

- `name` (optional)
- `email` (required)
- `subject` (optional)
- `message` (required)
- `hp` (honeypot; should be empty)
- `recaptchaToken` (required when `RECAPTCHA_SECRET` is set)

## Environment variables

Copy `.env.example` to `.env.local` and fill values. Key variables:

- `CONTACT_RECEIVER_EMAIL` — required. Destination inbox for messages.
- SendGrid path (preferred): `SENDGRID_API_KEY`, optional `SENDGRID_FROM_EMAIL`.
- SMTP fallback: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, optional `SMTP_FROM`.
- `RECAPTCHA_SECRET` — optional. When present the server verifies `recaptchaToken`.
- `REDIS_URL` — optional. If present, Redis is used for rate limiting (better for multi-instance deployments). If absent, an in-memory per-instance limiter is used.

The route picks the provider in this order:

1. SendGrid (if `SENDGRID_API_KEY` present)
2. SMTP (if SMTP_* vars are present)
3. Dev fallback — when `NODE_ENV !== 'production'` and no provider is configured the payload is logged but not sent.

## Quick local test (PowerShell)

1. Install dependencies and run the dev server:

   ```powershell
   npm install
   npm run dev
   ```

2. Create `.env.local` from `.env.example`, set `CONTACT_RECEIVER_EMAIL` and either SendGrid or SMTP credentials, then restart the dev server so Next picks up env vars.

3. Send a test POST (no reCAPTCHA):

   ```powershell
   Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/contact' -ContentType 'application/json' -Body (@{ name='Test'; email='you@example.com'; message='Hello from local test'; subject='Local test' ; hp=''} | ConvertTo-Json) -Verbose | ConvertTo-Json -Depth 5
   ```

   - Expected success response: `{ "ok": true }`
   - If rate-limited you will get HTTP 429 and a JSON error with `Retry-After` header.

If you set `RECAPTCHA_SECRET`, include `recaptchaToken` in the JSON body obtained from the client-side recaptcha flow.

## Deliverability and production checklist

- For SendGrid: verify your sending domain in SendGrid and add the SPF/DKIM DNS records they provide. This greatly improves deliverability to Gmail.
- For SMTP (e.g., Gmail / Google Workspace): prefer using an application-specific password (or a verified sending domain) and ensure SPF/DKIM are configured for the FROM domain.
- Set `NODE_ENV=production` and configure env vars in your host (Vercel, Netlify, Docker, etc.)
- Consider enabling `REDIS_URL` for a shared rate limiter in multi-instance deployments.

## Troubleshooting

- No email sent but API returns `{ ok: true }`:
  - In development, if no provider credentials are set the route logs the payload and returns success. Check server logs to confirm whether it attempted to send.
- Email goes to spam:
  - Check SPF/DKIM for the sending domain and verify the domain in your provider (SendGrid).
  - Confirm `FROM` header is appropriate and matches verified domain when possible.
- Want to see provider responses (for debugging):
  - The route logs provider information in development, but it does not return provider internals in the API response. For more detailed debugging, tail server logs while performing a test POST.

## Next steps I can take for you

- Tail the dev server logs while you POST so I can confirm the provider response.
- Run a controlled send using SMTP credentials you provide (preferably via a secure channel) and report the SMTP response.
- Add an admin-only endpoint to list recent contact attempts (protected by a secret) for easier debugging.

If you'd like me to tail logs and re-run a test POST now, restart your dev server after updating `.env.local` and tell me when it's running — I can then POST a test message and report what the provider responded with.
