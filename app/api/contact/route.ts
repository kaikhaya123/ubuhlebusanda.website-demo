import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  hp?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject, hp } = body as ContactPayload;

    if (hp && hp.trim().length > 0) return NextResponse.json({ ok: true });
    if (!email || !message) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      logger: true,
      debug: true,
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject || `Website message from ${name || 'visitor'}`,
      text: `Name: ${name || '-'}\nEmail: ${email || '-'}\n\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Failed to send email', details: String(err) }, { status: 502 });
  }
}
