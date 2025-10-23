import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log the request body for debugging
    console.log('Test contact request:', body);
    
    // Return the same structure the main contact endpoint would
    return NextResponse.json({ 
      ok: true,
      debug: {
        receivedPayload: body,
        environmentVars: {
          hasSmtp: !!process.env.SMTP_HOST,
          smtpHost: process.env.SMTP_HOST,
          smtpPort: process.env.SMTP_PORT,
          receiverConfigured: !!process.env.CONTACT_RECEIVER_EMAIL,
          nodeEnv: process.env.NODE_ENV
        }
      }
    });
  } catch (err) {
    console.error('Test contact API error:', err);
    return NextResponse.json({ 
      error: 'Request failed', 
      details: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}