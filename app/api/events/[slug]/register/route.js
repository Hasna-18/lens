import { NextResponse } from 'next/server';
import { registerForEvent, getEventRegistrations } from '@/lib/db';

export async function POST(req, { params }) {
  try {
    const { slug } = params;
    const body = await req.json();
    
    if (!body.name || !body.phone || !body.dob) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await registerForEvent(slug, body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Registration Error:', err);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { slug } = params;
    const registrations = await getEventRegistrations(slug);
    return NextResponse.json(registrations);
  } catch (err) {
    console.error('Registration Fetch Error:', err);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
