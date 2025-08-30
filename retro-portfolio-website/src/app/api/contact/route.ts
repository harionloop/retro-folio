import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    const r = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['your.email@domain.com'],
      subject: subject || 'New Contact Submission',
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (r.error) return NextResponse.json({ error: r.error }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e:unknown) {
    return NextResponse.json({ error: e?.message || 'error' }, { status: 500 });
  }
}
