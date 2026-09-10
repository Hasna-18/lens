import { NextResponse } from 'next/server';
import { getEventSettings, updateEventSettings } from '../../../lib/db';

export async function GET() {
  try {
    const settings = await getEventSettings();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error('Error fetching event settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = await updateEventSettings(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating event settings:', error);
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}

export async function PUT(request) {
  return POST(request);
}
