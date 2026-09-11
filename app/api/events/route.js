import { NextResponse } from 'next/server';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.warn('DB offline or unreachable, returning empty list:', error.message);
    return NextResponse.json([], { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.dateDay || !body.imageUrl || !body.filterType) {
      return NextResponse.json({ error: 'Missing required fields (title, dateDay, imageUrl, filterType)' }, { status: 400 });
    }

    const newEvent = await addEvent(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error adding event:', error);
    return NextResponse.json({ error: error.message || 'Failed to add event' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const targetId = body.id || body.slug;
    if (!targetId) {
      return NextResponse.json({ error: 'Event ID or slug is required for update' }, { status: 400 });
    }

    const updated = await updateEvent(targetId, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: error.message || 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id') || searchParams.get('slug');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id || body.slug;
    }

    if (!id) {
      return NextResponse.json({ error: 'Event ID or slug is required' }, { status: 400 });
    }

    const res = await deleteEvent(id);
    return NextResponse.json(res);
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete event' }, { status: 500 });
  }
}
