import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text, html } = await request.json();

    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL!,
      subject,
      text,
      html,
    };
    await sgMail.send(msg);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error:any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
}
